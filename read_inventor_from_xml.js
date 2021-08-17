const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');



const ApplicationPublication = require("./models/ApplicationPublication"),
    Inventors = require("./models/Inventors");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH;
let allFiles = []
const processXMLFiles = new Promise( function(resolve, reject) {
    const child = spawn('find', [`${extraDiskFolderPath}XML`, '-name', `*.XML`]);
    child.stdout.on('data', (data) => {
        console.log(`child.stdout: ${data}`)
        const files = data.toString().split('\n')
        if(files[files.length - 1] == '') {
            files.splice(files.length - 1, 1)
        }
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
.then(async () => {
    console.log(`Files Length ${allFiles}`)
    if(allFiles.length > 0) {
        await readFile(0)
    }
})


const readFile = async (fileIndex) => {
    const filePath = allFiles[fileIndex]
    console.log(`FileIndex - ${fileIndex} - ${filePath}`)
    fs.readFile(filePath, async function(err,data){
        if (!err) {
            try {            
                let findIndex = data.toString().indexOf('<us-patent-application')
                if(findIndex !== -1) {                
                    let xmlData = data.toString().substring(findIndex, data.length)
                    if(parser.validate(xmlData)) {
                        const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                        //console.log(JSON.stringify(xmlToJSON))
                        if(xmlToJSON.hasOwnProperty('us-patent-application')) {
                            const usBibliographic = xmlToJSON['us-patent-application']['us-bibliographic-data-application']
                            const publicationReference = usBibliographic['publication-reference']
                            const applicationReference = usBibliographic['application-reference']
                            
                            let inventors = []
                            if(usBibliographic.hasOwnProperty('parties')) {
                                const applicants = usBibliographic.parties.applicants.applicant
    
                                if(applicants.length > 0) {
                                    applicants.forEach( applicant => {
                                        if(applicant['@_app-type'] == 'applicant-inventor') {
                                            const addressBook = applicant.addressbook
                                            const middleName = addressBook.hasOwnProperty('middle-name') ? addressBook['middle-name'] : ''
                                            let name = `${addressBook['first-name']} `
                                            if(middleName !== '') {
                                                name += `${middleName} `
                                            }
                                            name += `${addressBook['last-name']}`
                                            inventors.push({
                                                appno_doc_num: applicationReference['document-id']['doc-number'],
                                                name: decode(name, {level: 'xml'}),
                                                given_name: decode(addressBook['first-name'], {level: 'xml'}),
                                                family_name: decode(addressBook['last-name'], {level: 'xml'}),
                                                middle_name: decode(middleName, {level: 'xml'}),
                                                file_name: fileName
                                            })
                                        }
                                    })
                                }
                            } else if(usBibliographic.hasOwnProperty('us-parties')) {
                                const applicants = usBibliographic['us-parties'].inventors.inventor                            
                                if(applicants.length > 0) {
                                    applicants.forEach( applicant => {
                                        const addressBook = applicant.addressbook
    
                                        const middleName = addressBook.hasOwnProperty('middle-name') ? addressBook['middle-name'] : ''
                                        let name = `${addressBook['first-name']} `
                                        if(middleName !== '') {
                                            name += `${middleName} `
                                        }
                                        name += `${addressBook['last-name']}`
    
                                        inventors.push({
                                            appno_doc_num: applicationReference['document-id']['doc-number'],
                                            name: decode(name, {level: 'xml'}),
                                            given_name: decode(addressBook['first-name'], {level: 'xml'}),
                                            family_name: decode(addressBook['last-name'], {level: 'xml'}),
                                            middle_name: decode(middleName, {level: 'xml'}),
                                            file_name: fileName
                                        })
                                    })
                                }
                            }

                            if(inventors.length > 0 ) {
                                await Inventors.bulkCreate(inventors,  {ignoreDuplicates: true})
                                await ApplicationPublication.create({
                                    appno_doc_num: applicationReference['document-id']['doc-number'],
                                    appno_date: `${appnoDate.substr(0,4)}-${appnoDate.substr(4,2)}-${appnoDate.substr(6,2)}`,
                                    pgpub_doc_num: publicationReference['document-id']['doc-number'],
                                    pgpub_date: `${grantDate.substr(0,4)}-${grantDate.substr(4,2)}-${grantDate.substr(6,2)}`,
                                })
                            }

                            if(fileIndex + 1 < allFiles.length) {
                                await readFile(allFiles[fileIndex + 1])
                            }
                        }
                    }                
                }            
            } catch(error){
                console.log(error.message)
            }
        } else {
            console.log(err);
        }
    });
}