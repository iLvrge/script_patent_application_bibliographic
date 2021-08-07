const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');

const ApplicationDetails = require("./models/ApplicationDetails"),
    ApplicationClaims = require("./models/ApplicationClaims"),
    ApplicationFigures = require("./models/ApplicationFigures"),
    ApplicationSpecifications = require("./models/ApplicationSpecifications"),
    Inventors = require("./models/Inventors");

const fileName = 'US20210045996A1-20210218.XML'
    filePath = path.join(__dirname, fileName),
    mainFolderPath = '/var/www/html/trash/patent_application_bibliographic/';

const folderName = 'I20210204'
/*
exec(`wget https://bulkdata.uspto.gov/data/patent/application/redbook/2021/${folderName}.tar -P ${mainFolderPath}DOWNLOAD/` , (err, stdout, stderr) => {
    if( !err ) {
        
    }
})*/

console.log(`tar -xvf ${mainFolderPath}DOWNLOAD/${folderName}.tar`)
const option = {maxBuffer: 1024 * 1024}
const spawnOptions = {
    stdio: [
        'inherit', // StdIn.
        'pipe',    // StdOut.
        'pipe'     // StdErr.
    ],
};
const folderList = [`/var/www/html/trash/patent_application_bibliographic/DOWNLOAD/I20210204`, `/var/www/html/trash/patent_application_bibliographic/DOWNLOAD/I20210204-SUPP`]
/* 
let allUTILFolders = [], allPromises = []
folderList.forEach(folder => {
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
        allUTILFolders.forEach( folder => {
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
            const promiseXML = new Promise( function(resolve, reject) {
                const findXMLFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, 'name', `*.XML`, '-exec', 'mv', '-t', `${mainFolderPath}XML {} +`]);

                findXMLFiles.on('close', (code) => {
                    resolve(code)
                })

            })   
            
            const promiseTIF = new Promise( function(resolve, reject) {
                const findIMAGESFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, 'name', `*.TIF`, '-exec', 'mv', '-t', `${mainFolderPath}IMAGES {} +`]);

                findIMAGESFiles.on('close', (code) => {
                    resolve(code)
                })
            })

            Promise.all([promiseXML, promiseTIF])
            .then(() => {
                const allFiles = []
                const processXMLFiles = new Promise( function(resolve, reject) {
                    const child = spawn('find', [`${mainFolderPath}XML`, '-name', `*.XML`]);
                    child.stdout.on('data', (data) => {
                        console.log(`child.stdout: ${data}`)
                        const files = data.toString().split('\n')
                        allFiles = [...allFiles, ...files]
                    });
                    child.stderr.on('data', (data) => {
                        reject(data)
                    });
                    child.on('close', (code) => {
                        resolve('AllFolderDOne')    
                    })  
                })

                Promise.all([processXMLFiles])
                .then(() => {
                    console.log('allFiles', allFiles.length)
                })
            })
        })
    }
}) */



const promiseXML = new Promise( function(resolve, reject) {
    const findXMLFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, 'name', `*.XML`, '-exec', 'mv', '-t', `${mainFolderPath}XML`, '{}', '+']);

    findXMLFiles.stdout.on('data', (data) => {
        console.log(`child.stdout: ${data}`)
    });


    findXMLFiles.on('close', (code) => {
        console.log(`Close: ${code}`)
        resolve(code)
    })

})   

/* const promiseTIF = new Promise( function(resolve, reject) {
    const findIMAGESFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, 'name', `*.TIF`, '-exec', 'mv', '-t', `${mainFolderPath}IMAGES {} +`]);

    findIMAGESFiles.on('close', (code) => {
        resolve(code)
    })
}) */

Promise.all([promiseXML/* , promiseTIF */])
.then(() => {
    const allFiles = []
    const processXMLFiles = new Promise( function(resolve, reject) {
        const child = spawn('find', [`${mainFolderPath}XML`, '-name', `*.XML`]);
        child.stdout.on('data', (data) => {
            console.log(`child.stdout: ${data}`)
            const files = data.toString().split('\n')
            allFiles = [...allFiles, ...files]
        });
        child.stderr.on('data', (data) => {
            reject(data)
        });
        child.on('close', (code) => {
            resolve('AllFolderDOne')    
        })  
    })

    Promise.all([processXMLFiles])
    .then(() => {
        console.log('allFiles', allFiles.length)
    })
})





  