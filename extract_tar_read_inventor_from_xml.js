const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');



const ApplicationPublication = require("./models/ApplicationPublication"),
    Inventors = require("./models/Inventors");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH1, extraDiskFolderPath2 = process.env.EXTRA_DISK_PATH3;
let compressFiles = []
const processXMLFiles = new Promise( function(resolve, reject) {
    const child = spawn('find', [`${extraDiskFolderPath}DOWNLOAD`, '-name', `*.tar`]);
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
    let folderName = compressFiles[fileIndex]
    console.log(`Start file moving -  ${folderName} - ${extraDiskFolderPath2}DOWNLOAD/`)
    try {
        const moveTar = new Promise((resolve, reject) => {
            const child =  spawn('mv', [folderName, `${extraDiskFolderPath2}DOWNLOAD/`])
    
            child.stdout.on('data', (data) => {
                console.log(`child.stdout: ${data}`)            
            });
    
            child.stderr.on('data', (data) => {
                reject(data)
            });
    
            child.on('close', (code) => {
                resolve('Extract DOne')    
            })
        })
        Promise.all([moveTar])
        .then(() => {
            console.log('File move done')
            folderName = folderName.replace(extraDiskFolderPath, extraDiskFolderPath2)
            console.log(`NEW FILEEEEEE: ${folderName}`)            
            let folderList = []
            const extractTar = new Promise((resolve, reject) => {        
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

                                    console.log(`ALLLL DONEEEEEEE: ${downloadPath} -  ${startDate} - ${folderName}`)
                                    downloadFilesAndProcess()

                                    const childFolders =  spawn('rm', ['-R', `${extraDiskFolderPath2}EXTRACT_FILES/*`])

                                    childFolders.on('close', (code) => {
                                        console.log('Child folders deleted')    
                                    }) 

                                    const deleteTar =  spawn('rm', [folderName])

                                    deleteTar.on('close', (code) => {
                                        console.log('File Tar deleted')    
                                    })                                         
                                })
                            })
                        }
                    })
                }
                
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