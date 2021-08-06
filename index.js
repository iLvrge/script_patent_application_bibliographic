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
    path = '/var/www/html/trash/patent_application_bibliographic/';

const folderName = 'I20210204'

exec(`wget https://bulkdata.uspto.gov/data/patent/application/redbook/2021/${folderName}.tar -P ${path}/DOWNLOAD/` , (err, stdout, stderr) => {
    if( !err ) {
        exec(`tar -xvf ${path}/DOWNLOAD/${folderName}.tar` , (err, stdout, stderr) => {
            if( !err ) {
                exec(`find ${path}${folderName} -type d  -name "UTIL*"`, (err, stdout, stderr) => {
                    if(!err) {
                        const allFolders = stdout.split('\n')
                        console.log(allFolders)
                        if(Array.isArray(allFolders)) {
                            allFolders.forEach( folder => {
                                exec(`unzip ${folder}/*.ZIP -d ${path}EXTRACT_FILES`, async (err, stdout, stderr) => {
                                    if(!err) {
                                        
                                        const promiseXML = new Promise( function(resolve, reject) {
                                            exec(`find ${path}EXTRACT_FILES/ -name "*.XML" -exec mv -t ${path}XML {} +`, (err, stdout, stderr) => {
                                                if(!err) {
                                                    resolve('DONE')
                                                }
                                            })
                                        })
                                        
                                        const promiseTIF = new Promise( function(resolve, reject) {
                                            exec(`find ${path}EXTRACT_FILES/ -name "*.TIF" -exec mv -t ${path}IMAGES {} +`, (err, stdout, stderr) => {
                                                if(!err) {
                                                    resolve('DONE')
                                                }
                                            })
                                        })
                
                                        await Promise.all([promiseXML, promiseTIF])
                
                                        exec(`find ${path}XML -name "*.XML"`, (err, stdout, stderr) => {
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
    }
})


