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
exec(`tar -C ${mainFolderPath}DOWNLOAD/ -xvf ${mainFolderPath}DOWNLOAD/${folderName}.tar`, option , (err, stdout, stderr) => {
    if( !err ) {        
        const folderList = [`${mainFolderPath}DOWNLOAD/${folderName}`, `${mainFolderPath}DOWNLOAD/${folderName}-SUPP`]
        folderList.forEach(mainFolder => {
            const processFolder = spawn('find', [mainFolder, '-type', 'd', '-name', '"UTIL*"']);
            processFolder.stdout.on('data', async(data) => {
                console.log(`stdout: ${data}`);
                const allFolders = data.split('\n')
                console.log(allFolders)
                if(Array.isArray(allFolders)) {
                    const uzipAllFolders = allFolders.map( folder => {
                        const unZipFolder = spawn('unzip', ['-o', `${folder}/*.ZIP`, '-d', `"${mainFolderPath}EXTRACT_FILES/"`]);
                        unZipFolder.stdout.on('data', async (data) => {
                            const promiseXML = new Promise( function(resolve, reject) {
                                const findXMLFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, '-name', `"*.XML"`, '-exec', 'mv', '-t', `${mainFolderPath}XML {} +`]);

                                findXMLFiles.on('close', (code) => {
                                    resolve(code)
                                })

                            })   
                            
                            const promiseTIF = new Promise( function(resolve, reject) {
                                const findIMAGESFiles = spawn('find', [`${mainFolderPath}EXTRACT_FILES/`, '-name', `"*.TIF"`, '-exec', 'mv', '-t', `${mainFolderPath}IMAGES {} +`]);

                                findIMAGESFiles.on('close', (code) => {
                                    resolve(code)
                                })
                            }) 
                            await Promise.all([promiseXML, promiseTIF])
                        })

                        unZipFolder.stderr.on('data', (data) => {
                            console.error(`unZipFolder stderr: ${data}`);
                        });
                    })
                    await Promise.all(uzipAllFolders)

                    const listAllXMLFiles = spawn('find', [`${mainFolderPath}XML`, '-name', `"*.XML"`]);

                    listAllXMLFiles.stdout.on('data', (data) => {
                        console.log('IN XML FILES LISTING')
                        const allFiles = data.split('\n')

                        if(Array.isArray(allFiles)) {
                            allFiles.forEach( file => {
                                console.log(`FILE: ${file}`)
                            })
                        }
                    })
                    listAllXMLFiles.stderr.on('data', (data) => {
                        console.error(`unZipFolder stderr: ${data}`);
                    });
                }
            })
            processFolder.stderr.on('data', (data) => {
                console.error(`processFolder stderr: ${data}`);
            });
        })        
    }            
})