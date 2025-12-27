const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');



const ApplicationPublication = require("./models/ApplicationPublication"),
    Inventors = require("./models/Inventors");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH1, extraDiskFolderPath2 = process.env.EXTRA_DISK_PATH3, currentFolder = process.env.CURRENT_PATH;
let compressFiles = [], counterIndex = 30;
const processXMLFiles = new Promise( function(resolve, reject) {
    const child = spawn('find', [`${extraDiskFolderPath}DOWNLOAD`, '-name', `*.ZIP`]);
/*    const child = spawn('find', [`.`, '-name', `*.ZIP`]);*/
    child.stdout.on('data', (data) => {
        //console.log(`child.stdout: ${data}`)
        const files = data.toString().split('\n')
        if(files[files.length - 1] == '') {
            files.splice(files.length - 1, 1)
        }
        //console.log(`child.files: ${files.length}`)
        compressFiles = [...compressFiles, ...files]
    });
    child.stderr.on('data', (data) => {
        console.log(`ERRORRRRRRR - ${data}`)
        reject(data)
    });
    child.on('close', (code) => {
        resolve('AllFolderDOne')    
    })  
})
  


Promise.all([processXMLFiles])
.then(async () => {
    console.log(`Files Length -  ${compressFiles.length}`)
    compressFiles = [...new Set(compressFiles)];
    console.log(`Unique Files Length -  ${compressFiles.length}`)
    console.log(`${compressFiles[0]}`)
    if(compressFiles.length > 0) {
        await extractFile(0)
    } 
})

const extractFile = async (fileIndex) => {
    let folderName = compressFiles[fileIndex], tap = 0
    console.log(`Start file moving -  ${folderName} - ${extraDiskFolderPath2}DOWNLOAD/`)
    try {
        const moveTar = new Promise((resolve, reject) => {
            resolve('Extract DOne')    
			/*const child =  spawn('mv', [folderName, `${extraDiskFolderPath2}DOWNLOAD/`])
    
            child.stdout.on('data', (data) => {
                console.log(`child.stdout: ${data}`)            
            });
    
            child.stderr.on('data', (data) => {
                reject(data)
            });
    
            child.on('close', (code) => {
                resolve('Extract DOne')    
            })*/
        })
        Promise.all([moveTar])
        .then(() => {
            console.log('File move done')
            //folderName = folderName.replace(extraDiskFolderPath, extraDiskFolderPath2)
            console.log(`NEW FILEEEEEE: ${folderName}`)            
            let folderList = []
            /*const extractTar = new Promise((resolve, reject) => {        
                const child =  spawn('tar', ['-xvf', folderName])
                child.stdout.on('data', (data) => {
                    console.log(`child.stdout: ${data}`)
                    const allFolders = data.toString().split('\n')
                    if(allFolders.length > 0) {
                        if(allFolders[allFolders.length - 1] == '') {
                            allFolders.splice(allFolders.length - 1, 1)
                        }
                    }
                    folderList = [...folderList, ...allFolders]
                });
                child.stderr.on('data', (data) => {
                    reject(data)
                });
                child.on('close', (code) => {
                    resolve('Extract DOne')    
                })        
            })*/
			const extractTar = new Promise((resolve, reject) => {        
                const child =  spawn('unzip', [ folderName])
                child.stdout.on('data', (data) => {
                    console.log(`child.stdout: ${data}`)
                    const allFolders = data.toString().split('\n')
                    if(allFolders.length > 0) {
                        if(allFolders[allFolders.length - 1] == '') {
                            allFolders.splice(allFolders.length - 1, 1)
                        }
                    }
                    folderList = [...folderList, ...allFolders]
                });
                child.stderr.on('data', (data) => {
                    reject(data)
                });
                child.on('close', (code) => {
//                    resolve('Extract DOne')  
			let fol = folderName.replace(extraDiskFolderPath,""),checkDirectory=''
			fol = fol.replace("DOWNLOAD/", "")
			fol = fol.replace("A", "")
			fol = fol.replace("B", "")
			fol = fol.replace(".ZIP", "")
			fol = fol.replace(".zip","")
/*			if(folderName.indexOf('b') !== null){
				fol +='b'
			} else if(folderName.indexOf('a') !== null) {
				fol +='a'
			}*/
			checkDirectory = `${currentFolder}project/pdds/ICEApplication/${fol}`
			fs.access(checkDirectory, function(error){			
				if(error){
					checkDirectory = `${currentFolder}${fol}`
					folderList = [checkDirectory]
				} else {
					folderList = [checkDirectory]
					tap = 1
				}
				resolve('Extract DOne')
			})
			/*folderList = [`${currentFolder}project/pdds/ICEApplication/${fol.replace(".ZIP", "")}`]*/
/*			folderList = [`${currentFolder}${fol.replace(".ZIP","")}`]*/
			console.log(folderList)
                })         
            })
            Promise.all([extractTar])
            .then(() => {
                console.log('folderList', folderList)
                if(folderList.length > 0) {
                    let allUTILFolders = [], allPromises = []
                    folderList.forEach(folder => { //find all UTIL folder
                        const processAllZipFolders = new Promise((resolve, reject) => {        
                            const child = spawn('find', [folder, '-type', 'd', '-name', 'UTIL*']);
                            child.stdout.on('data', (data) => {
                                console.log(`child.stdout: ${data}`)
                                const allFolders = data.toString().split('\n')
                                allUTILFolders = [...allUTILFolders, ...allFolders]
                            });
                            child.stderr.on('data', (data) => {
                                reject(data)
                            });
                            child.on('close', (code) => {
                                resolve('AllFolderDOne')    
                            })        
                        })
                        allPromises.push(processAllZipFolders)
                    })

                    Promise.all(allPromises)
                    .then(() => {
                        console.log('ALL PROMISE DONNNNNEEEEE')
                        console.log('allUTILFolders', allUTILFolders)
                        if(allUTILFolders.length > 0) {
                            const unzipAllFolder = []
                            allUTILFolders.forEach( folder => { //unzip all UTIL folders
                                const processUnZipFolders = new Promise((resolve, reject) => {     
                                    const child = spawn('unzip', ['-o', `${folder}/*.ZIP`, '-d', `${extraDiskFolderPath2}EXTRACT_FILES/`])
                                    child.stdout.on('data', (data) => {
                                        console.log(`child.stdout: ${data}`)
                                    });
                                    child.on('close', (code) => {
                                        resolve('FolderExtractDone')    
                                    })   
                                })
                                unzipAllFolder.push(processUnZipFolders)
                            })

                            Promise.all(unzipAllFolder)
                            .then(() => {
                                const promiseXML = new Promise( function(resolve, reject) { //move xml files
                                    const findXMLFiles = spawn('find', [`${extraDiskFolderPath2}EXTRACT_FILES/`, '-name', `*.XML`, '-exec', 'mv', '-t', `${extraDiskFolderPath2}XML`, '{}', '+']);

                                    findXMLFiles.stdout.on('data', (data) => {
                                        console.log(`child.stdout: ${data}`)
                                    });

                                    findXMLFiles.stderr.on('data', (data) => {
                                        console.log(`child.stderr: ${data}`)
                                        reject(`Error: ${data}`)
                                    });

                                    findXMLFiles.on('close', (code) => {
                                        resolve(code)
                                    })

                                })   
                                
                                const promiseTIF = new Promise( function(resolve, reject) { // move tif files
                                    const findIMAGESFiles = spawn('find', [`${extraDiskFolderPath2}EXTRACT_FILES/`, '-name', `*.TIF`, '-exec', 'mv', '-t', `${extraDiskFolderPath2}IMAGES`, '{}', '+']);

                                    findIMAGESFiles.stdout.on('data', (data) => {
                                        console.log(`child.stdout: ${data}`)
                                    });

                                    findIMAGESFiles.stderr.on('data', (data) => {
                                        console.log(`child.stderr: ${data}`)
                                        reject(`Error: ${data}`)
                                    });

                                    findIMAGESFiles.on('close', (code) => {
                                        resolve(code)
                                    })
                                })

                                Promise.all([promiseXML, promiseTIF])
                                .then(() => {

                                    console.log(`ALLLL DONEEEEEEE:  - ${folderName}`)
                                    

                                    const childFolders =  spawn('rm', ['-R', `${extraDiskFolderPath2}EXTRACT_FILES/*`])

                                    childFolders.on('close', (code) => {
                                        console.log('Child folders deleted')    
                                      const childExtractFolders =  spawn('find', ['.', "-name", "I*", "-type", "d", "-exec", "rm", "-rf", "{}", "+"])
                                        
                                        childExtractFolders.on('close', (code) => {
				      console.log('childExtractFolders deleted')   
				      const deleteTar =  spawn('rm', [folderName])

                                        deleteTar.on('close', (code) => {
                                            console.log('File Tar deleted')  
						let mainFolder = folderName.replace(extraDiskFolderPath2, "")
						mainFolder = mainFolder.replace("DOWNLOAD/", "")
						mainFolder = mainFolder.replace("A","")						
						mainFolder = mainFolder.replace("B","")
						mainFolder = mainFolder.replace(".ZIP","")
						mainFolder = mainFolder.replace(".zip","")
/*						if(folderName.indexOf('b') !== null){
							mainFolder +='b'
						} else if(folderName.indexOf('a') !== null){
							mainFolder +='a'
						}*/
						if(tap === 1) {
							spawn('rm',['-R', `${currentFolder}project/pdds/ICEApplication/${mainFolder}`])
						} else {						
							spawn('rm',['-R',`${currentFolder}${mainFolder}`])
						}
                                            folderName = folderName.replace(extraDiskFolderPath2, extraDiskFolderPath)
                                            const deleteTar1 =  spawn('rm', [folderName])
                                            deleteTar1.on('close', (code) => {
                                                console.log('File Tar deleted')  
                                                const nextIndex = fileIndex + 1;
                                                if(nextIndex < compressFiles.length && nextIndex < counterIndex) {
                                                    extractFile(nextIndex)
                                                }  
                                            })
                                        })
					})
                                    })                                    
                                })
                            })
                        }
                    }).catch((err) => {
						console.log(JSON.stringify(folderList))
                        console.log(`File Tar ZIP - ${err}`)
                    })
                }
                
            }).catch((err) => {
                console.log(`File Tar - ${err}`)
            })
        })
        .catch((err) => {
            console.log(`Error in file moving - ${err}`)
        })
    } catch( err ) {
        console.log(`Error in extractFile - ${err}`)
    }
    
    /* 
     */

}

