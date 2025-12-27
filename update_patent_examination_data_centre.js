const fs = require('fs'),
    path = require('path'),    
    XmlStream = require('xml-stream'),
    moment = require('moment');
/* const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser')  */
const { exec, spawn  } = require('child_process'); 
/* const parser = new XMLParser();  */
const parser = require('fast-xml-parser');
const ApplicationPublicationGrant = require("./models/PED/ApplicationPublicationGrant"),
ApplicationExtension = require("./models/PED/ApplicationExtension"),
ApplicationStatus = require("./models/PED/ApplicationStatus"),
ApplicationApplicants = require("./models/PED/ApplicationApplicants"),
ApplicationInventors = require("./models/PED/ApplicationInventors"),
ApplicationCorrespondence = require("./models/PED/ApplicationCorrespondence");

let allFiles = [];

const processXMLFiles = new Promise( function(resolve, reject) {
    
    const child = spawn('find', [`/mnt/volume_sfo2_14`, '-name', `*.xml`]);
    
    child.stdout.on('data', (data) => {
        //console.log(`child.stdout: ${data}`)
        const files = data.toString().split('\n')
        if(files[files.length - 1] == '') {
            files.splice(files.length - 1, 1)
        }
        //console.log(`child.files: ${files.length}`)
        allFiles = [...allFiles, ...files]
        allFiles.sort()
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
    console.log(allFiles)
    console.log(`Files Length -  ${allFiles.length}`)
    allFiles = [...new Set(allFiles)];
    console.log(`Unique Files Length -  ${allFiles.length}`)
    console.log(`${allFiles[0]}`)
    if(allFiles.length > 0) {
        await readFile(0)
    } 
})

const readFile = async (fileIndex) => {
    try {
        const fullPath = allFiles[fileIndex]
        //console.log(`FileIndex - ${fileIndex} - ${fullPath}`)
        const fileName = fullPath.split('/').pop();
    
        const stream = fs.createReadStream(fullPath);
        const xml = new XmlStream(stream);
        let xmlString = ''
        let increment = 0
        xml.on('data', async function(node) {
            //console.log(node)
            if(node.indexOf('<uspat:PatentData') !== -1) {
                xmlString = node
            } else if(node.indexOf('</uspat:PatentData') !== -1) {
                xmlString += node
                //console.log(`File Number ${increment}: `, xmlString)
                increment++
               /*  if(XMLValidator.validate(xmlString)) {  */
                if(parser.validate(xmlString)) { 
                    const xmlParse = parser.parse( xmlString, {ignoreAttributes: false});
                    
                    if(xmlParse.hasOwnProperty('uspat:PatentData')) {                                 
                        const patentData = xmlParse['uspat:PatentData'];
                        const patentCaseMetadata = patentData['uspat:PatentCaseMetadata'];
                        
    
                        let applicationNumber = '', applicationDate = '', publicationNumber = '', publicationDate = '',
                        grantNumber = '', grantDate = '';
                        const inventors = [], applicants = [], correspondence = [], applicationExtension = [], applicationStatus = [];
    
                        if(patentCaseMetadata.hasOwnProperty('uscom:ApplicationNumberText')) {
                            applicationNumber = patentCaseMetadata['uscom:ApplicationNumberText']['#text'].toString()
                        }
                        /* if(patentCaseMetadata.hasOwnProperty('pat:FilingDate')) {
                            applicationDate = patentCaseMetadata['pat:FilingDate'].toString()
                        }
                        if(patentCaseMetadata.hasOwnProperty('uspat:PatentPublicationIdentification')) {
                            publicationNumber = patentCaseMetadata['uspat:PatentPublicationIdentification']['pat:PublicationNumber'].toString()
                            publicationDate = patentCaseMetadata['uspat:PatentPublicationIdentification']['com:PublicationDate'].toString()
                        }
                        if(patentCaseMetadata.hasOwnProperty('uspat:PatentGrantIdentification')) {
                            grantNumber = patentCaseMetadata['uspat:PatentGrantIdentification']['pat:PatentNumber'].toString()
                            grantDate = patentCaseMetadata['uspat:PatentGrantIdentification']['pat:GrantDate'].toString()
                        } */
                        
                        if(patentCaseMetadata.hasOwnProperty('uspat:PartyBag')) {
                            const parties = patentCaseMetadata['uspat:PartyBag']; 
                            if(parties.hasOwnProperty('pat:InventorBag')) {
                                const listInventors = parties['pat:InventorBag']['pat:Inventor']; 
                                if(Array.isArray(listInventors)) {
                                    const promises = listInventors.map( async inventor => {
                                        const invObj = inventor['com:PublicationContact']
                                        const name = invObj['com:Name']['com:PersonName']['com:PersonStructuredName']
                                        let fullName = ''
                                        if(name['com:FirstName'] != '') {
                                            fullName = name['com:FirstName']
                                        }
                                        if(name['com:MiddleName'] != '') {
                                            fullName += ' ' + name['com:MiddleName']
                                        }
                                        if(name['com:LastName'] != '') {
                                            fullName += ' ' + name['com:LastName']
                                        } 

                                        const findInventor = await ApplicationInventors.findOne({
                                            attributes: ['inventor_id'],
                                            where: {
                                                appno_doc_num: applicationNumber, 
                                                name: fullName.trim(),   
                                            }
                                        })

                                        if(findInventor != null && findInventor.inventor_id > 0) {
                                            await findInventor.update({
                                                city: invObj['com:CityName'],
                                                state: typeof invObj['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : invObj['com:GeographicRegionName'],
                                                country: invObj['com:CountryCode']
                                            })
                                        }

                                        /* inventors.push({
                                            appno_doc_num: applicationNumber, 
                                            name: fullName.trim(),
                                            first_name: name['com:FirstName'],
                                            middle_name: name['com:MiddleName'],
                                            last_name: name['com:LastName'],
                                            city: invObj['com:CityName'],
                                            state: typeof invObj['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : invObj['com:GeographicRegionName'],
                                            country: invObj['com:CountryCode']
                                        }) */
                                    })
                                    await Promise.all(promises)
                                } else {
                                    const invObj = listInventors['com:PublicationContact']
                                    const name = invObj['com:Name']['com:PersonName']['com:PersonStructuredName']
                                    let fullName = ''
                                        if(name['com:FirstName'] != '') {
                                            fullName = name['com:FirstName']
                                        }
                                        if(name['com:MiddleName'] != '') {
                                            fullName += ' ' + name['com:MiddleName']
                                        }
                                        if(name['com:LastName'] != '') {
                                            fullName += ' ' + name['com:LastName']
                                        } 

                                        const findInventor = await ApplicationInventors.findOne({
                                            attributes: ['inventor_id'],
                                            where: {
                                                appno_doc_num: applicationNumber, 
                                                name: fullName.trim(),   
                                            }
                                        })

                                        if(findInventor != null && findInventor.inventor_id > 0) {
                                            await findInventor.update({
                                                city: invObj['com:CityName'],
                                                state: typeof invObj['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : invObj['com:GeographicRegionName'],
                                                country: invObj['com:CountryCode']
                                            })
                                        }
                                    /* inventors.push({
                                        appno_doc_num: applicationNumber, 
                                        name: fullName.trim(),
                                        first_name: name['com:FirstName'],
                                        middle_name: name['com:MiddleName'],
                                        last_name: name['com:LastName'],
                                        city: invObj['com:CityName'],
                                        state: typeof invObj['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : invObj['com:GeographicRegionName'],
                                        country: invObj['com:CountryCode']
                                    }) */
                                }
                            }   
                        }  
                        //console.log(applicationNumber, applicationDate, publicationNumber, publicationDate, grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension)
                         
                    }
                } 
            } else {
                xmlString += node
            }
        });
        xml.on('end', async function(node) {
            console.log('Node end')
            const nextIndex = fileIndex + 1;
            if(nextIndex < allFiles.length) {
                await readFile(nextIndex)
            }
        });
        xml.on('error', async function(message) {
            console.log('Parsing as ' + ('auto') + ' failed: ' + message);
            const nextIndex = fileIndex + 1;
            if(nextIndex < allFiles.length) {
                await readFile(nextIndex)
            }
        });
    } catch (err) {
        console.log(`Catch Error: ${err}`)
        const nextIndex = fileIndex + 1;
        if(nextIndex < allFiles.length) {
            await readFile(nextIndex)
        }
    } 
}

const insertUpdateData = async (applicationNumber, applicationDate, publicationNumber, publicationDate,
    grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension) => {

    await ApplicationPublicationGrant.destroy({
        where: {
            appno_doc_num: applicationNumber
        }
    })

    await ApplicationExtension.destroy({
        where: {
            appno_doc_num: applicationNumber
        }
    })

    await ApplicationApplicants.destroy({
        where: {
            appno_doc_num: applicationNumber
        }
    })

    await ApplicationInventors.destroy({
        where: {
            appno_doc_num: applicationNumber
        }
    });

    /**
     * Insert or Update
     */

    await ApplicationPublicationGrant.create({
        appno_doc_num: applicationNumber,
        appno_date: applicationDate,
        pgpub_doc_num: publicationNumber,
        pgpub_date: publicationDate,
        grant_doc_num: grantNumber,
        grant_date: grantDate
    });

    await ApplicationStatus.bulkCreate(applicationStatus, {ignoreDuplicates: true});
    await ApplicationExtension.bulkCreate(applicationExtension, {ignoreDuplicates: true});
    await ApplicationApplicants.bulkCreate(applicants, {ignoreDuplicates: true});
    await ApplicationInventors.bulkCreate(inventors, {ignoreDuplicates: true});

    if(correspondence.length > 0) {
        ApplicationCorrespondence.findOne({
            where: {
                name: correspondence[0].name
            }
        }).then( async record => {
            if(record !== null) {
                await ApplicationCorrespondence.update({
                    name: correspondence[0].name,
                    address: correspondence[0].address,
                    city: correspondence[0].city,
                    state: correspondence[0].state,
                    postal: correspondence[0].postal,
                    country:  correspondence[0].country,
                }, {
                    where: {
                        application_correspondence_id: record.application_correspondence_id
                    }
                })
            } else {
                await ApplicationCorrespondence.bulkCreate(correspondence, {ignoreDuplicates: true});
            }
        })
    }
} 