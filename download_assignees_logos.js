const request = require('request'),
    config = require("./config/index"),
    CitedPatents = require("./models/CitedPatents"),
    AssigneeOrganizations = require("./models/AssigneeOrganizations"),
    OrganisationApplication = require("./models/OrganisationApplication"),
    fs = require('fs'),
    AWS  = require('aws-sdk'),
    Pusher = require("pusher");
const { exec, spawn  } = require("child_process");
    const APPID='938985'
    const KEY='3252bb191d77e92ddb3c'
    const SECRET='2a3dd823cd1abcd45c71'
    const CLUSTER='us3'
    const USETLS=true
    const CHANNEL='patentrack-channel'
    const EVENT='patentrack-event'
    
    const pusher = new Pusher({
        appId: APPID,
        key: KEY,
        secret: SECRET,
        cluster: CLUSTER, 
        useTLS: USETLS,
        keepAlive: true,
    })

let allAssignees = process.argv.slice(2)[0]

let getAssigneeList = [], errorCodes= []

const sendNotification = (message) => {
    pusher.trigger(CHANNEL, EVENT, message)
}
const retrieveCitedPatentAssignee = async(startIndex) => {
    try{
        const url =  getAssigneeList[startIndex].get('api_logo') != '' ? getAssigneeList[startIndex].get('api_logo') : getAssigneeList[startIndex].get('api_logo1') != '' ? getAssigneeList[startIndex].get('api_logo1') : getAssigneeList[startIndex].get('api_logo2') != '' ? getAssigneeList[startIndex].get('api_logo2') : getAssigneeList[startIndex].get('api_logo3')

        console.log(`url => ${startIndex}`, url)
        let extension = '.png'
        
        let path = getAssigneeList[startIndex].get('assignee_query').replace(/\//g, '') .replace(/\./g,"_").replace(/ /g,"_"), pathDirectory = '/var/www/html/script/';
        if(url.indexOf('/jpeg;') || url.indexOf('/jpg;')) {
            extension = '.jpeg'
        } 
        path = path.trim() + extension
        if( url !== '' && url !== null && url !== null ) { 
            let imageData = ''
            if(url.indexOf('data:image/') !== -1) {
                imageData = url
                /* let buff = Buffer.from(imageData, 'base64');
                await fs.writeFileSync(`${pathDirectory}${path}`, buff); */
                imageData = imageData.split(';base64,').pop();
                fs.writeFile(`${pathDirectory}${path}`, imageData, {encoding: 'base64'}, function (err,data) {
                    if (err) {
                        console.log('Error in file', err)
                        checkNextRow(startIndex)
                    } else {
                        console.log('UPLOADING FILE')
                        uploadFile(startIndex, path, pathDirectory)
                    }                    
                })
            } else {
                request.head(url, (err, response, body) => {
                    
                    request(url)
                    .pipe(fs.createWriteStream(`${pathDirectory}${path}`))
                    .on('close', () => {
                        let imageData = fs.readFileSync(`${pathDirectory}${path}`, {flag:'r'});
                        if(imageData){
                            uploadFile(startIndex, path, pathDirectory)
                        } else {
                            checkNextRow(startIndex)
                        }
                    })
                })
            }            
        } else {
            checkNextRow(startIndex)
        }
    } catch (err) {
        errorCodes.push(startIndex)
        console.log("Download assignee logos => err", err)
        checkNextRow(startIndex)
    }
}


const uploadFile = async(startIndex, path, pathDirectory) => {









    exec(`file  --mime-type -b ${pathDirectory}${path}`, function (error, stdout, stderr) {
        let contentType = stdout.split('\n')
            contentType = contentType[0].toString()
        if(contentType === "" || contentType == undefined) {
            contentType = "image/png";
        }
        let name = pathDirectory+path
		console.log(`Name ${name} ${pathDirectory} ${path}`)
        if(contentType.indexOf('png') !== null) {
            const newName = name.replace('.png', '.jpg')
            const convertImage = spawn('convert', [name, '-quality', 90, newName]);
            convertImage.on('close', (code) => {
                console.log('close', code)
                console.log('checkPATH', `TAP:${path}MAP`)
                if (fs.existsSync(pathDirectory+path)) {
                    name = newName
                    console.log('name', newName)
					resizeFile(startIndex, contentType, pathDirectory, name)
                } else {
                    console.log('File not exist', newName)
                }
            }) 
        } else {
			resizeFile(startIndex, contentType, pathDirectory, name)
		}
    });
}

const resizeFile = async(startIndex, contentType, pathDirectory, name) => {
	const resizeImage = spawn('convert', [name, '-resize', '50x', name]);
	resizeImage.on('close', (code) => {
		if (fs.existsSync(name)) {
			console.log(`After resize File exist ${name}`)
			const bucketConfig = config.bucketConfig;  

			let filename = name.replace(pathDirectory, '').replace(/\s+/g, '-');
			let imageData = fs.readFileSync(name, {flag:'r'});
			let s3 = new AWS.S3({
				credentials: {
					accessKeyId: bucketConfig.accessKeyId,
					secretAccessKey: bucketConfig.secretAccessKey,
				},
				region: bucketConfig.region
			})
			const params = {
				Key: `${bucketConfig.dirName}/${filename}`,
				Bucket: bucketConfig.bucketName,
				Body: imageData,
				ACL: 'public-read',
				ContentType: contentType,
				ContentDisposition: 'inline'
			}
			console.log("params", params)
			s3.putObject(params, async function(err, data) {
				console.log(err, data);
				if(err == null) {
					filename = `https://s3-${bucketConfig.region}.amazonaws.com/${bucketConfig.bucketName}/${bucketConfig.dirName}/${filename}`;
					console.log(filename)
					let organisation = null;
					
					if(getAssigneeList[startIndex].get('organisation_id') === 0) {
						organisation = await OrganisationApplication.findOne({
							where: {
								organisation_name: getAssigneeList[startIndex].get('assignee_organization')
							}
						})
					} else {
						organisation = await OrganisationApplication.findOne({
							where: {
								organisation_id: getAssigneeList[startIndex].get('organisation_id')
							}
						})
					}
					console.log('organisation', organisation)
					if(organisation === null) {
						organisation = await OrganisationApplication.create({
							organisation_name: getAssigneeList[startIndex].get('assignee_organization'),
							logo_optimize: filename,
							original_logo: filename
						})

						await AssigneeOrganizations.update({
							organisation_id: organisation.get('organisation_id')
						}, {
							where : {
								assignee_id: getAssigneeList[startIndex].get('assignee_id')
							}
						})
					} else if(organisation !== null) {
						console.log("IN ELSE ", organisation.get('organisation_id'), getAssigneeList[startIndex].get('assignee_id'))    
						const assignee = await AssigneeOrganizations.findOne({where: {assignee_id: getAssigneeList[startIndex].get('assignee_id')}});
						if(assignee) {
							console.log("IN ASSIGNEE")
							assignee.organisation_id = parseInt(organisation.get('organisation_id'))
							await assignee.save();
							await organisation.update({
								logo_optimize: filename,
								original_logo: filename
							})
						} else {
							console.log("ASSIGNEE NOT FOUND")
						}
					}
					const removeFile = spawn('rm', [name]);
					removeFile.on('close', (code) => {
						name = name.replace('.jpg', '.png')
						if (fs.existsSync(name)) {
							spawn('rm', [name]);
						}
					})                       
					checkNextRow(startIndex)
				} else {
					checkNextRow(startIndex)
				}
			});
		}
	})
}


const checkNextRow = (startIndex) => {
    startIndex += 1
    if(startIndex < getAssigneeList.length) {
        retrieveCitedPatentAssignee(startIndex)
    } else {
        if(errorCodes.length > 0) {
            sendNotification(`Find error from API in these patents: ${errorCodes.join(', ')}`)
        }
        sendNotification(`Assignee logo download script finished.`)
    }
}
   
( async () => {    
    
    allAssignees = JSON.parse(allAssignees)

    if(allAssignees.length > 0) {
        getAssigneeList = await AssigneeOrganizations.findAll({
            attributes: ['assignee_id', 'assignee_organization', 'assignee_query', 'domain', 'api_logo', 'api_logo1', 'api_logo2', 'api_logo3', 'without_square', 'image_url','organisation_id'],
            where:{ 
                assignee_id: allAssignees, 
                api_logo: {[config.Op.ne]: ''}, 
                api_logo: {[config.Op.ne]: 'null'}
            }
        })
        console.log('getAssignees.length', getAssigneeList.length)
        if( getAssigneeList.length > 0 ) {
           
            sendNotification(`Total patents: ${getAssigneeList.length}`)
            retrieveCitedPatentAssignee(0)
        }  
    }  
})();