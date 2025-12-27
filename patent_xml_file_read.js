const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');



const GrantApplication = require("./models/GrantApplications"),
    GrantInventors = require("./models/GrantInventors");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH;
let allFiles = []

const processXMLFiles = new Promise( function(resolve, reject) {
    
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
                let inventors = [], applicationPublication = []

                const promise = new Promise( (resolve, reject) => {
                    let findIndex = data.toString().indexOf('<us-patent-grant')
                    if(findIndex !== -1) {
                        let xmlData = data.toString().substring(findIndex, data.length)
                        if(parser.validate(xmlData)) {                        
                            const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                            
                            if(xmlToJSON.hasOwnProperty('us-patent-grant')) {                                 
                                const usBibliographic = xmlToJSON['us-patent-grant']['us-bibliographic-data-grant']
                                const publicationReference = usBibliographic['publication-reference']
                                const applicationReference = usBibliographic['application-reference']
                                
                                
                                if(usBibliographic.hasOwnProperty('parties')) {
                                    const applicants = usBibliographic.parties.applicants.applicant
                                    
                                    if(Array.isArray(applicants) && applicants.length > 0) {
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
                                    } else if(typeof applicants === "object") {
                                        if(applicants['@_app-type'] == 'applicant-inventor') {
                                            const addressBook = applicants.addressbook
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
                                                file_name: fileName,
                                                full_path: fullPath
                                            })
                                        }
                                    }
                                } else if(usBibliographic.hasOwnProperty('us-parties')) {
                                    const applicants = usBibliographic['us-parties'].inventors.inventor  
                                    console.log(JSON.stringify(applicants))                          
                                    if(Array.isArray(applicants) && applicants.length > 0) {
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
                                                file_name: fileName,
                                                full_path: fullPath
                                            })
                                        })
                                    } else if(typeof applicants === "object") {
                                        const addressBook = applicants.addressbook
        
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
                                            file_name: fileName,
                                            full_path: fullPath
                                        })
                                    }
                                }
                                const appnoDate = applicationReference['document-id']['date'].toString(), grantDate = publicationReference['document-id']['date'].toString()
                                const title = usBibliographic['invention-title']['#text'].toString()
                                applicationPublication.push({
                                    appno_doc_num: applicationReference['document-id']['doc-number'],
                                    appno_date: `${appnoDate.substr(0,4)}-${appnoDate.substr(4,2)}-${appnoDate.substr(6,2)}`,
                                    grant_doc_num: publicationReference['document-id']['doc-number'],
                                    grant_date: `${grantDate.substr(0,4)}-${grantDate.substr(4,2)}-${grantDate.substr(6,2)}`,
                                    file_name: fileName,
                                    title
                                })
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
                                
                                if(xmlToJSON.hasOwnProperty('PATDOC')) {
                                    const usBibliographic = xmlToJSON['PATDOC']['SDOBI']
                                    const publicationReference = usBibliographic['B100']
                                    const applicationReference = usBibliographic['B200']
                                    if(usBibliographic.hasOwnProperty('B700')) {
                                        const inventorsList = usBibliographic['B700']['B720']['B721']
                                        console.log(JSON.stringify(inventorsList))        
                                        if(Array.isArray(inventorsList) ){
                                            inventorsList.forEach( applicant => {
                                                const applicantName = applicant['PARTY-US']['NAM']                                                
                                                let name = `${applicantName['FNM']['PDAT'].toString()} ${applicantName['SNM']['STEXT']['PDAT'].toString()}`
                                                if(name.indexOf('undefined') !== -1) {
                                                    name = name.replace('undefined', '')
                                                }
                                                inventors.push({
                                                    appno_doc_num: applicationReference['B210']['DNUM']['PDAT'].toString(),
                                                    grant_doc_num: publicationReference['B110']['DNUM']['PDAT'].toString(),
                                                    name: decode(name.trim(), {level: 'xml'}),
                                                    given_name: decode(applicantName['SNM']['STEXT']['PDAT'], {level: 'xml'}),
                                                    family_name: decode(applicantName['FNM']['PDAT'], {level: 'xml'}),
                                                    middle_name: decode('', {level: 'xml'}),
                                                    file_name: fileName,
                                                    full_path: fullPath
                                                })
                                            })
                                        } else if(typeof inventorsList === "object") {
                                            const applicantName = inventorsList['PARTY-US']['NAM']
                                            let name = `${applicantName['FNM']['PDAT'].toString()} ${applicantName['SNM']['STEXT']['PDAT'].toString()}`
                                            if(name.indexOf('undefined') !== -1) {
                                                name = name.replace('undefined', '')
                                            }
                                            inventors.push({
                                                appno_doc_num: applicationReference['B210']['DNUM']['PDAT'].toString(),
                                                grant_doc_num: publicationReference['B110']['DNUM']['PDAT'].toString(),
                                                name: decode(name.trim(), {level: 'xml'}),
                                                given_name: decode(applicantName['SNM']['STEXT']['PDAT'], {level: 'xml'}),
                                                family_name: decode(applicantName['FNM']['PDAT'], {level: 'xml'}),
                                                middle_name: decode('', {level: 'xml'}),
                                                file_name: fileName,
                                                full_path: fullPath
                                            })
                                        } 
                                    }
                                    
                                    const appnoDate = applicationReference['B220']['DATE']['PDAT'].toString(), grantDate = publicationReference['B140']['DATE']['PDAT'].toString()
                                   
                                    applicationPublication.push({
                                        appno_doc_num: applicationReference['B210']['DNUM']['PDAT'].toString(),
                                        appno_date: `${appnoDate.substr(0,4)}-${appnoDate.substr(4,2)}-${appnoDate.substr(6,2)}`,
                                        grant_doc_num: publicationReference['B110']['DNUM']['PDAT'].toString(),
                                        grant_date: `${grantDate.substr(0,4)}-${grantDate.substr(4,2)}-${grantDate.substr(6,2)}`,
                                        file_name: fileName,
                                    })  
                                    resolve('read')
                                }
                            }
                        } else {
                            reject('inventor not found')
                        }
                    }
                });
                
                promise
                .then(async () => {
                    console.log(inventors, applicationPublication)
                    if(inventors.length > 0 ) {
                        await GrantInventors.bulkCreate(inventors,  {ignoreDuplicates: true})
                    } else {
                        console.log(`No inventor - ${fullPath}`);
                    }
                    if(applicationPublication.length > 0) {
                        await GrantApplication.bulkCreate(applicationPublication,  {ignoreDuplicates: true})
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
