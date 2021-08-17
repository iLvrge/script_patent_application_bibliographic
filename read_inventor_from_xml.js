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
    /* if(allFiles.length > 0) {
        await readFile(0)
    } */
})


const readFile = async (fileIndex) => {
    const filePath = allFiles[fileIndex]
    console.log(`FileIndex - ${fileIndex} - ${filePath}`)
    fs.readFile(filePath, async function(err,data){
        if (!err) {
            try {            
                let inventors = [], applicationPublication = {}
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
                            const appnoDate = applicationReference['document-id']['date'].toString(), grantDate = publicationReference['document-id']['date'].toString()
                            applicationPublication = {
                                appno_doc_num: applicationReference['document-id']['doc-number'],
                                appno_date: `${appnoDate.substr(0,4)}-${appnoDate.substr(4,2)}-${appnoDate.substr(6,2)}`,
                                pgpub_doc_num: publicationReference['document-id']['doc-number'],
                                pgpub_date: `${grantDate.substr(0,4)}-${grantDate.substr(4,2)}-${grantDate.substr(6,2)}`,
                            }
                        }
                    }                
                } else {
                    let findIndex = data.indexOf('<patent-application-publication')
                    if(findIndex !== -1) {                
                        let xmlData = data.toString().substring(findIndex, data.length)
                        if(parser.validate(xmlData)) {
                            const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                            //console.log(JSON.stringify(xmlToJSON))
                            if(xmlToJSON.hasOwnProperty('patent-application-publication')) {
                                const usBibliographic = xmlToJSON['patent-application-publication']['subdoc-bibliographic-information']
                                const publicationReference = usBibliographic['document-id']
                                const applicationReference = usBibliographic['domestic-filing-data']
                                if(usBibliographic.hasOwnProperty('inventors')) {
                                    const inventorsList = usBibliographic.inventors
                                    if(inventorsList.hasOwnProperty('first-named-inventor')) {
                                        const firstInventor = inventorsList['first-named-inventor']['name']
                                        const middleName = firstInventor.hasOwnProperty('middle-name') ? firstInventor['middle-name'] : ''

                                        let name = `${firstInventor['given-name']} `
                                        if(middleName !== '') {
                                            name += `${middleName} `
                                        }
                                        name += `${firstInventor['family-name']}`

                                        inventors.push({
                                            appno_doc_num: applicationReference['application-number']['doc-number'],
                                            grant_doc_num: publicationReference['doc-number'],
                                            name: decode(name, {level: 'xml'}),
                                            given_name: decode(firstInventor['given-name'], {level: 'xml'}),
                                            family_name: decode(firstInventor['family-name'], {level: 'xml'}),
                                            middle_name: decode(middleName, {level: 'xml'}),
                                            file_name: filePath
                                        })
                                    }


                                    if(inventorsList.hasOwnProperty('inventor')) {
                                        const inventor = inventorsList.inventor

                                        if(Array.isArray(inventor) ){
                                            inventor.forEach( applicant => {
                                                const middleName = applicant['name'].hasOwnProperty('middle-name') ? applicant['name']['middle-name'] : ''

                                                let name = `${applicant['name']['given-name']} `
                                                if(middleName !== '') {
                                                    name += `${middleName} `
                                                }
                                                name += `${applicant['name']['family-name']}`
                                                inventors.push({
                                                    appno_doc_num: applicationReference['application-number']['doc-number'],
                                                    grant_doc_num: publicationReference['doc-number'],
                                                    name: decode(name, {level: 'xml'}),
                                                    given_name: decode(applicant['name']['given-name'], {level: 'xml'}),
                                                    family_name: decode(applicant['name']['family-name'], {level: 'xml'}),
                                                    middle_name: decode(middleName, {level: 'xml'}),
                                                    file_name: filePath
                                                })
                                            })
                                        } else if(typeof inventor === "object") {
                                            const middleName = inventor.hasOwnProperty('middle-name') ? inventor['name']['middle-name'] : ''

                                            let name = `${inventor['name']['given-name']} `
                                            if(middleName !== '') {
                                                name += `${middleName} `
                                            }
                                            name += `${inventor['name']['family-name']}`
                                            inventors.push({
                                                appno_doc_num: applicationReference['application-number']['doc-number'],
                                                grant_doc_num: publicationReference['doc-number'],
                                                name: decode(name, {level: 'xml'}),
                                                given_name: decode(inventor['name']['given-name'], {level: 'xml'}),
                                                family_name: decode(inventor['name']['family-name'], {level: 'xml'}),
                                                middle_name: decode(middleName, {level: 'xml'}),
                                                file_name: filePath
                                            })
                                        }
                                    }
                                    const appnoDate = applicationReference['filing-date'].toString(), grantDate = publicationReference['document-date'].toString()
                                    applicationPublication = {
                                        appno_doc_num: applicationReference['application-number']['doc-number'],
                                        appno_date: `${appnoDate.substr(0,4)}-${appnoDate.substr(4,2)}-${appnoDate.substr(6,2)}`,
                                        pgpub_doc_num: publicationReference['doc-number'],
                                        pgpub_date: `${grantDate.substr(0,4)}-${grantDate.substr(4,2)}-${grantDate.substr(6,2)}`,
                                    }
                                }
                            }
                        }
                    }
                }   
                if(inventors.length > 0 ) {
                    await Inventors.bulkCreate(inventors,  {ignoreDuplicates: true})
                    await ApplicationPublication.create(applicationPublication)
                }
            } catch(error){
                console.log(error.message)
            }
        } else {
            console.log(err);
        }
    });
}