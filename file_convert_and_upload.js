const fs = require('fs');

const { exec, spawn  } = require('child_process');

const mainFolderPath = '/var/www/html/trash/patent_application_bibliographic/';

const AWS  = require('aws-sdk');


const config = require("./config/index");

let allFiles = [], startIndex = 0


const uploadFileToAWSAndDelete = (index) => {
    const file = allFiles[index]
    console.log(`File in Queue - ${index} - ${file}`)
    const outputFile = file.replace('TIF', 'PNG')
    /*const tif2png = spawn('convert', [file, outputFile]);*/
    const tif2png = spawn('tiff2png', ['-force', '-destdir', `${mainFolderPath}IMAGES`, file]);
    tif2png.stdout.on('data', (data) => {
        console.log(`Convert DONE - ${data}`)
    });
    tif2png.stderr.on('data', (data) => {
        console.log(`Convert Error - ${data} - ${file}`)

        /* const anotherConversion = spawn('tiff2png',['-force', file, outputFile])

        tif2png.stdout.pipe(anotherConversion.stdin); */

        
        
    });
    tif2png.on('close', (code) => {
        console.log(`conversion done - ${code}`)
        fs.readFile(file, function(err,data){
            if (!err) {
                try {            
                    let name = outputFile.split('/').pop()
                    //name = name.replace(/-/g, '_')
                    const bucketConfig = config.bucketConfig
    
                    let s3 = new AWS.S3({
                        credentials: {
                            accessKeyId: bucketConfig.accessKeyId,
                            secretAccessKey: bucketConfig.secretAccessKey,
                        },
                        region: bucketConfig.region
                    })
    
                    const contentType = "image/png"
    
                    const params = {
                        Key: `${bucketConfig.dirName}/${name}`,
                        Bucket: bucketConfig.bucketName,
                        Body: data,
                        ACL: 'public-read',
                        ContentType: contentType,
                        ContentDisposition: 'inline'
                    }
    
                    s3.putObject(params, function(err, data) {
                        console.log(`S3 ${err} - ${JSON.stringify(data)}`)
                        if(err == null) {
                            console.log(`File upload Done https://s3-${bucketConfig.region}.amazonaws.com/${bucketConfig.bucketName}/${bucketConfig.documentDir}/${name})
                            //file uploaded to aws
                            /*const mainFile = spawn('rm', [file]);
                            mainFile.stdout.on('data', (data) => {
                                console.log(`mainFile.stdout: ${data}`)
                            });
                            mainFile.stderr.on('data', (data) => {
                                console.log(`mainFile.stderr: ${data}`)
                            });
                            mainFile.on('close', (code) => {
                                //Done
                                mainFile.on('close', (code) => {
                                    console.log(`mainFile.close: ${code}`)
                                })
                               
                            })  
                            //Delete Output file
                            const newFile = spawn('rm', [outputFile]);
                            newFile.stdout.on('data', (data) => {
                                console.log(`newFile.stdout: ${data}`)
                            });
                            newFile.stderr.on('data', (data) => {
                                console.log(`newFile.stderr: ${data}`)
                            });
                            newFile.on('close', (code) => {
                                console.log(`newFile.close: ${code}`)
                                startIndex++
                                if(startIndex < allFiles.length - 1) {
                                    //uploadFileToAWSAndDelete(startIndex)
                                }
                            })*/
                        }
                    });
                } catch (error) {
                    console.log(`File Error - ${error} - ${file} - ${outputFile}`)
                }
            } else {
                console.log(`Error while reading file - ${err}`)
            }
        })          
    })
    
}

const processTIFFiles = new Promise( function(resolve, reject) {
    const child = spawn('find', [`${mainFolderPath}IMAGES`, '-name', `*.TIF`]);
    child.stdout.on('data', (data) => {
        console.log(`child.stdout: ${data}`)
        const files = data.toString().split('\n')  
        allFiles = [...allFiles, ...files]
    });
    child.stderr.on('data', (data) => {
        reject(data)
    });
    child.on('close', (code) => {
        resolve('AllFolderDone')    
    })  
})

Promise.all([processTIFFiles])
.then(() => {
    console.log('allFiles', allFiles.length)

    if(allFiles.length > 0 ) {
        uploadFileToAWSAndDelete(startIndex)
    }  
})