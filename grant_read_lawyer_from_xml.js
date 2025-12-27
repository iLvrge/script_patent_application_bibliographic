const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');



const LawfirmsApplication = require("./models/LawfirmsApplication"),
LawfirmsGrant = require("./models/LawfirmsGrant");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH;
let allFiles = []

const processXMLFiles = new Promise( function(resolve, reject) {
    const argumentSlice = process.argv.slice(2);
    const year = argumentSlice[0]
    const child = spawn('find', [`${extraDiskFolderPath}patent/XML2`, '-name', `*.XML`]);
    child.stdout.on('data', (data) => {
        //console.log(`child.stdout: ${data}`)
        const files = data.toString().split('\n')
        if(files[files.length - 1] == '') {
            files.splice(files.length - 1, 1)
        }
        //console.log(`child.files: ${files.length}`)
        allFiles = [...allFiles, ...files]
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
    console.log(`Files Length -  ${allFiles.length}`)
    allFiles = [...new Set(allFiles)];
    console.log(`Unique Files Length -  ${allFiles.length}`)
    console.log(`${allFiles[0]}`)
    if(allFiles.length > 0) {
        await readFile(0)
    } 
})


const readFile = async (fileIndex) => {
    const fullPath = allFiles[fileIndex]
    console.log(`FileIndex - ${fileIndex} - ${fullPath}`)
    const fileName = fullPath.split('/').pop();
    fs.readFile(fullPath, async function(err,data){
        if (!err) {
            try {            
                let agentsData = []

                const promise = new Promise( (resolve, reject) => {
                    let findIndex = data.toString().indexOf('<us-patent-grant')
                    if(findIndex !== -1) {
                        let xmlData = data.toString().substring(findIndex, data.length)
                        if(parser.validate(xmlData)) {                        
                            const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                            /**
                             * LawFirm
                             */
                            if(xmlToJSON.hasOwnProperty('us-patent-grant')) {                                 
                                const usBibliographic = xmlToJSON['us-patent-grant']['us-bibliographic-data-grant']
                                const publicationReference = usBibliographic['publication-reference']
                                const applicationReference = usBibliographic['application-reference']
                                
                                
                                if(usBibliographic.hasOwnProperty('parties')) { 

                                    const agents = usBibliographic['parties']['agents']['agent']
                                    
                                    if(Array.isArray(agents) && agents.length > 0) {
                                        agents.forEach( agent => {
                                            const addressBook = agent.addressbook
                                            let orgName = ''
                                            if(addressBook.hasOwnProperty('orgname')) {
                                                orgName = addressBook['orgname'] 
                                            } else if(addressBook.hasOwnProperty('first-name')) {
                                                orgName = addressBook['first-name'] 
                                                if(addressBook['last-name'] != '') {
                                                    orgName += ' ' + addressBook['last-name'] 
                                                }
                                            }

                                            agentsData.push({
                                                appno_doc_num:  applicationReference.hasOwnProperty('document-id') ? applicationReference['document-id']['doc-number']: applicationReference['application-number']['doc-number'], 
                                                name: orgName,
                                                file_name: fileName
                                            }) 
                                        })
                                    } else if(typeof agents === "object") {
                                        const addressBook = agents.addressbook
                                        let orgName = ''
                                        if(addressBook.hasOwnProperty('orgname')) {
                                            orgName = addressBook['orgname']
                                        } else if(addressBook.hasOwnProperty('first-name')) {
                                            orgName = addressBook['first-name'] 
                                            if(addressBook['last-name'] != '') {
                                                orgName += ' ' + addressBook['last-name'] 
                                            }
                                        }   
                                        agentsData.push({
                                            appno_doc_num:  applicationReference.hasOwnProperty('document-id') ? applicationReference['document-id']['doc-number']: applicationReference['application-number']['doc-number'], 
                                            name: orgName,
                                            file_name: fileName
                                        })    
                                    } 
                                } else if(usBibliographic.hasOwnProperty('us-parties')) {
                                    const agents = usBibliographic['us-parties']['agents']['agent']
                                    console.log(agents.length, JSON.stringify(agents))                          
                                    if(Array.isArray(agents) && agents.length > 0) {
                                        agents.forEach( app => {
                                            const addressBook = app.addressbook
                                            let orgName = ''
                                            if(addressBook.hasOwnProperty('orgname')) {
                                                orgName = addressBook['orgname']
                                            } else if(addressBook.hasOwnProperty('first-name')) {
                                                orgName = addressBook['first-name'] 
                                                if(addressBook['last-name'] != '') {
                                                    orgName += ' ' + addressBook['last-name'] 
                                                }
                                            }
                                            agentsData.push({
                                                appno_doc_num:  applicationReference.hasOwnProperty('document-id') ? applicationReference['document-id']['doc-number']: applicationReference['application-number']['doc-number'], 
                                                name: orgName,
                                                file_name: fileName
                                            })
                                        })
                                    } else if(typeof agents === "object") {
                                        const addressBook = agents.addressbook
                                        let orgName = ''
                                        if(addressBook.hasOwnProperty('orgname')) {
                                            orgName = addressBook['orgname']
                                        } else if(addressBook.hasOwnProperty('first-name')) {
                                            orgName = addressBook['first-name'] 
                                            if(addressBook['last-name'] != '') {
                                                orgName += ' ' + addressBook['last-name'] 
                                            }
                                        }
                                        agentsData.push({
                                            appno_doc_num:  applicationReference.hasOwnProperty('document-id') ? applicationReference['document-id']['doc-number']: applicationReference['application-number']['doc-number'], 
                                            name: orgName,
                                            file_name: fileName
                                        })
                                    } 
                                }
                                resolve('read')
                            }
                        }                
                    } else {
                        let findIndex = data.toString().indexOf('<PATDOC')
                        if(findIndex !== -1) {                
                            let xmlData = data.toString().substring(findIndex, data.length)
                            /**
                            * Remove <B500> This node has lots of childeren open without closing 
                             */
                            const findIndexOpen500 = xmlData.toString().indexOf('<B500>')
                            const findIndexClosing500 = xmlData.toString().indexOf('</B500>')

                            xmlData = xmlData.substring(0, findIndexOpen500) + xmlData.substring(findIndexClosing500 + 7, xmlData.length)
                            if(parser.validate(xmlData)) {
                                const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                                //console.log(JSON.stringify(xmlToJSON))
                                
                                
                            }
                        } else {
                            reject('agentsData not found')
                        }
                    }
                });
                
                promise
                .then(async () => {
                    console.log(agentsData);
                    
                    if(agentsData.length > 0 ) {
                        await LawfirmsGrant.bulkCreate(agentsData,  {ignoreDuplicates: true})
                    } else {
                        console.log(`No agentsData - ${fullPath}`);
                    }


                    const nextIndex = fileIndex + 1;
                    if(nextIndex < allFiles.length) {
                        readFile(nextIndex)
                    }
                }) 
                .catch((error) => {
                    console.log(`Eror message - ${error} - ${fullPath}`);
                    const nextIndex = fileIndex + 1;
                    if(nextIndex < allFiles.length) {
                        readFile(nextIndex)
                    }
                }) 
            } catch(error){
                console.log(`Eror message - ${error.message} - ${fullPath}`);
                const nextIndex = fileIndex + 1;
                if(nextIndex < allFiles.length) {
                    await readFile(nextIndex)
                }
            }
        } else {
            console.log(`Eror while reading file - ${err} - ${fullPath}`);
            const nextIndex = fileIndex + 1;
            if(nextIndex < allFiles.length) {
                await readFile(nextIndex)
            }
        }
    });
}
