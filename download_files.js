const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');

const ApplicationDetails = require("./models/ApplicationDetails"),
    ApplicationClaims = require("./models/ApplicationClaims"),
    ApplicationFigures = require("./models/ApplicationFigures"),
    ApplicationSpecifications = require("./models/ApplicationSpecifications"),
    Inventors = require("./models/Inventors");

const fileName = 'US20210045996A1-20210218.XML'
    filePath = path.join(__dirname, fileName),
    mainFolderPath = process.env.MAIN_FOLDER_PATH,
    extraDiskFolderPath = process.env.EXTRA_DISK_PATH;

let startDate = '2020-05-28 00:00:00', endDate = '2020-12-31 00:00:00'

const downloadFilesAndProcess = async() => {
    const startGetTime = new Date(startDate).getTime(), endGetTime = new Date(endDate).getTime()
    try{
        if (startGetTime < endGetTime) {
            const date = new Date(startDate)
            startDate = moment(date).add(1, 'week').day(4);
            const momentObject = moment(new Date(startDate))
            const folderName = `I${momentObject.format('YYYYMMDD')}`
            const downloadPath = `https://bulkdata.uspto.gov/data/patent/application/redbook/${momentObject.format('YYYY')}/${folderName}.tar`
            console.log(`FolderName: ${startDate} - ${folderName} - ${downloadPath}`)
            const downloadFileProcess = new Promise( (resolve, reject) => {
                const downloadFileSpawn = spawn('wget', [downloadPath, '-P', `${extraDiskFolderPath}DOWNLOAD/`])
                downloadFileSpawn.stdout.on('data', (data) => {
                    console.log(`downloadFileSpawn.stdout: ${data}`)
                });
                downloadFileSpawn.stderr.on('data', (data) => {
                    console.log(`Error downloadFileSpawn.stderr: ${data}`)
                    //reject(data)
                });

                downloadFileSpawn.on('close', (code) => {
                    resolve(`download downloadFileSpawn.close ${code}`)    
                }) 
            })
            Promise.all([downloadFileProcess])
            .then(async () => {
                /* await downloadFilesAndProcess() */
                let folderList = []
                const extractTar = new Promise((resolve, reject) => {        
                    const child =  spawn('tar', ['-xvf', `${extraDiskFolderPath}DOWNLOAD/${folderName}.tar`])
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
                                        const child = spawn('unzip', ['-o', `${folder}/*.ZIP`, '-d', `${mainFolderPath}EXTRACT_FILES/`])
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
                                        const findXMLFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, '-name', `*.XML`, '-exec', 'mv', '-t', `${extraDiskFolderPath}XML`, '{}', '+']);

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
                                        const findIMAGESFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, '-name', `*.TIF`, '-exec', 'mv', '-t', `${extraDiskFolderPath}IMAGES`, '{}', '+']);

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

                                        const childFolders =  spawn('rm', ['-R', `${extraDiskFolderPath}EXTRACT_FILES/*`])

                                        childFolders.on('close', (code) => {
                                            console.log('Child folders deleted')    
                                        }) 

                                        const deleteTar =  spawn('rm', [`${extraDiskFolderPath}DOWNLOAD/${folderName}.tar`])

                                        deleteTar.on('close', (code) => {
                                            console.log('File Tar deleted')    
                                        })                                         
                                    })
                                })
                            }
                        })
                    }
                    
                })
            }).catch(function(err) {
                console.log(`Reject: ${err}`)
            });
        }
    } catch (e) {
        console.log(e)
    }
}


(async function() {
    try {
        await downloadFilesAndProcess()
        //console.log(`${extraDiskFolderPath}DOWNLOAD/`)
    } catch (e) {
      console.log('caught', e)
    }
})();