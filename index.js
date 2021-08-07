const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser');

const { exec } = require('child_process');
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
exec(`wget https://bulkdata.uspto.gov/data/patent/application/redbook/2021/${folderName}.tar -P ${mainFolderPath}/DOWNLOAD/` , (err, stdout, stderr) => {
    if( !err ) {
        
    }
})*/

console.log(`tar -xvf ${mainFolderPath}DOWNLOAD/${folderName}.tar`)
const option = {maxBuffer: 1024 * 1024}
exec(`tar -C ${mainFolderPath}DOWNLOAD/ -xvf ${mainFolderPath}DOWNLOAD/${folderName}.tar`, option , (err, stdout, stderr) => {
    if( !err ) {
        console.log(stdout)
        exec(`find ${mainFolderPath}DOWNLOAD/${folderName} -type d  -name "UTIL*"`, option , (err, stdout, stderr) => {
            if(!err) {
                const allFolders = stdout.split('\n')
                console.log(allFolders)
                if(Array.isArray(allFolders)) {
                    allFolders.forEach( folder => {
                        exec(`unzip -o '${folder}/*.ZIP' -d "${mainFolderPath}EXTRACT_FILES/"`, option , async (err, stdout, stderr) => {
                            if(!err) {
                                
                                const promiseXML = new Promise( function(resolve, reject) {
                                    exec(`find ${mainFolderPath}EXTRACT_FILES/ -name "*.XML" -exec mv -t ${mainFolderPath}XML {} +`, option , (err, stdout, stderr) => {
                                        if(!err) {
                                            resolve('DONE')
                                        }
                                    })
                                })
                                
                                const promiseTIF = new Promise( function(resolve, reject) {
                                    exec(`find ${mainFolderPath}EXTRACT_FILES/ -name "*.TIF" -exec mv -t ${mainFolderPath}IMAGES {} +`, option , (err, stdout, stderr) => {
                                        if(!err) {
                                            resolve('DONE')
                                        }
                                    })
                                })
        
                                await Promise.all([promiseXML, promiseTIF])
        
                                exec(`find ${mainFolderPath}XML -name "*.XML"`, option , (err, stdout, stderr) => {
                                    if(!err) {
                                        const allFiles = stdout.split('\n')
                                        if(Array.isArray(allFiles)) {
                                            allFiles.forEach( file => {
                                                console.log(`FILE: ${file}`)
                                            })
                                        }
                                    }
                                })
                            } else {
                                console.log(err)
                            }
                        })
                    })
                }
            } else {
                console.log('Error', err)
            }
        })
    }            
})