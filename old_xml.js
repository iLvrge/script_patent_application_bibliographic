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
    mainFolderPath = '/var/www/html/trash/patent_application_bibliographic/2000/';

let allFiles = ['US20020157882A1-20021031.XML']
/* const processXMLFiles = new Promise( function(resolve, reject) {
    const child = spawn('find', [`${mainFolderPath}XML`, '-name', `*.XML`]);
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
    if(allFiles.length > 0) {
        await readFile(0)
    }
}) */

const readFile = async (fileIndex) => {
    const filePath = allFiles[fileIndex]
    fs.readFile(filePath, async function(err,data){
        if (!err) {
            try {            
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
                            let inventionTitle = usBibliographic['technical-information']['title-of-invention']
                            if(typeof inventionTitle === 'object'){
                                if(typeof inventionTitle['#text'] !== 'undefined') {
                                    inventionTitle = inventionTitle['#text']
                                }
                            } 
    
                            let inventors = []
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
                            }

                            let abstract = xmlToJSON['patent-application-publication']['subdoc-abstract']
    
                            if(typeof abstract === 'object'){
                                if(typeof abstract['paragraph'] !== 'undefined') {
                                    abstract = abstract['paragraph']['#text']
                                }
                            }
    
                            let specification = [], claims = [], description = xmlToJSON['patent-application-publication']['subdoc-description']['summary-of-invention']['section']
                            if(Array.isArray(description)) {
                                description.forEach( item => {
                                    if(typeof item === 'object') {
                                        if(Array.isArray(item['paragraph'])) {
                                            item['paragraph'].forEach( p => {
                                                specification.push({
                                                    appno_doc_num: applicationReference['application-number']['doc-number'],
                                                    grant_doc_num: publicationReference['doc-number'],
                                                    heading_id: p['@_id'],
                                                    text: decode(p['#text'], {level: 'xml'})
                                                })
                                            })
                                        } else if(typeof item['paragraph'] === 'object') {
                                            specification.push({
                                                appno_doc_num: applicationReference['application-number']['doc-number'],
                                                grant_doc_num: publicationReference['doc-number'],
                                                heading_id: item['paragraph']['@_id'],
                                                text: decode(item['paragraph']['#text'], {level: 'xml'})
                                            })
                                        }                                        
                                    }
                                })
                            }
                            description = xmlToJSON['patent-application-publication']['subdoc-description']['detailed-description']['section']
                            
                            if(Array.isArray(description)) {
                                description.forEach( item => {
                                    if(typeof item === 'object') {
                                        if(Array.isArray(item['paragraph'])) {
                                            item['paragraph'].forEach( p => {
                                                specification.push({
                                                    appno_doc_num: applicationReference['application-number']['doc-number'],
                                                    grant_doc_num: publicationReference['doc-number'],
                                                    heading_id: p['@_id'],
                                                    text: decode(p['#text'], {level: 'xml'})
                                                })
                                            })
                                        } else if(typeof item['paragraph'] === 'object') {
                                            specification.push({
                                                appno_doc_num: applicationReference['application-number']['doc-number'],
                                                grant_doc_num: publicationReference['doc-number'],
                                                heading_id: item['@_id'],
                                                text: decode(item['paragraph']['#text'], {level: 'xml'})
                                            })
                                        } 
                                    }
                                })
                            }

    
                            let usClaims = xmlToJSON['patent-application-publication']['subdoc-claims'].claim
                            if(Array.isArray(usClaims)) {
                                if(usClaims.length > 0) {
                                    const promiseClaims = usClaims.map( async claim => {
                                        let text = '';
                                        const recursiveClaim = async (element) => {
                                            if(typeof element === 'object') {
                                                text += `\n ${element['#text']}`
                                                if(typeof element.hasOwnProperty('claim-text')) {
                                                    if(Array.isArray(element['claim-text'])) {
                                                        element['claim-text'].forEach(async claimText => {
                                                            text += await recursiveClaim(claimText)
                                                        })
                                                    } else if(typeof element['claim-text'] === 'string'){
                                                        text += `\n ${element['claim-text']}`
                                                    }
                                                }
                                            } else if(typeof element === 'string') {
                                                text += `\n ${element}`
                                            }
                                            return text
                                        }
                                        
                                        text = await recursiveClaim(claim['claim-text'])
                                       
                                        claims.push({
                                            text: decode(text, {level: 'xml'}),
                                            claim_num: claim['@_num'],
                                            claim_id: claim['@_id'],
                                            appno_doc_num: applicationReference['application-number']['doc-number'],
                                            grant_doc_num: publicationReference['doc-number'],
                                        })
                                    })
                                    await Promise.all(promiseClaims)
                                }
                            }
                            
                            let figures = [], figure = typeof xmlToJSON['patent-application-publication']['subdoc-drawings'] !== 'undefined' ? xmlToJSON['patent-application-publication']['subdoc-drawings'].figure : []
    
                            if(Array.isArray(figure)) {
                                if(figure.length > 0) {
                                    figure.forEach( item => {
                                        const target = item['image']['@_file'].toString().replace('.TIF', '.pdf')
                                        figures.push({
                                            file: target,
                                            appno_doc_num: applicationReference['application-number']['doc-number'],
                                            grant_doc_num: publicationReference['doc-number'],
                                            figure_id: item['@_id'],
                                            figure_num: item['@_num']
                                        })
                                        /* exec(`tiff2pdf -o ${target} ${item['img']['@_file']}`, (err, stdout, stderr) => {
                                            if (!err) {
                                                figures.push({
                                                    file: target,
                                                    appno_doc_num: applicationReference['document-id']['doc-number'],
                                                    grant_doc_num: publicationReference['document-id']['doc-number'],
                                                    figure_id: item['@_id'],
                                                    figure_num: item['@_num']
                                                })
                                                exec(`mv ${target} /var/www/html/trash/patent_application_bibliographic/images/`, (err, stdout, stderr) => {
                                                    if (err) {
                                                        console.log('Move FIle error', err)
                                                        
                                                    }
                                                })
                                            }
                                        }) */
                                    })
                                }
                            }
                            const appnoDate = applicationReference['filing-date'].toString(), grantDate = publicationReference['document-date'].toString()
                            const application_details = {
                                appno_doc_num: applicationReference['application-number']['doc-number'],
                                grant_doc_num: publicationReference['doc-number'],
                                appno_date: `${appnoDate.substr(0,4)}-${appnoDate.substr(4,2)}-${appnoDate.substr(6,2)}`,
                                grant_date: `${grantDate.substr(0,4)}-${grantDate.substr(4,2)}-${grantDate.substr(6,2)}`,
                                title: decode(inventionTitle, {level: 'xml'}),
                                abstract: decode(abstract, {level: 'xml'})
                            }
                            
                            /* await ApplicationDetails.create(application_details)
                            await ApplicationClaims.bulkCreate(claims, { ignoreDuplicates: true })
                            await ApplicationFigures.bulkCreate(figures, { ignoreDuplicates: true })
                            await ApplicationSpecifications.bulkCreate(specification, { ignoreDuplicates: true })
                            await Inventors.bulkCreate(inventors, { ignoreDuplicates: true })  */
    
                            console.log('ALL Data', applicationReference, publicationReference, inventionTitle, application_details, inventors, abstract, specification, claims, figures)
                            
                            /* if(findIndex + 1 < allFiles.length) {
                                await readFile(allFiles[findIndex + 1])
                            } */
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


if(allFiles.length > 0) {
    readFile(0)
}