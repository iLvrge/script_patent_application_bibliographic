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
let dap = false;

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
                if(parser.validate(xmlString) ) { 
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
                        if(patentCaseMetadata.hasOwnProperty('pat:FilingDate')) {
                            applicationDate = patentCaseMetadata['pat:FilingDate'].toString()
                        }
                        if(patentCaseMetadata.hasOwnProperty('uspat:PatentPublicationIdentification')) {
                            publicationNumber = patentCaseMetadata['uspat:PatentPublicationIdentification']['pat:PublicationNumber'].toString()
                            publicationDate = patentCaseMetadata['uspat:PatentPublicationIdentification']['com:PublicationDate'].toString()
                        }
                        if(patentCaseMetadata.hasOwnProperty('uspat:PatentGrantIdentification')) {
                            grantNumber = patentCaseMetadata['uspat:PatentGrantIdentification']['pat:PatentNumber'].toString()
                            grantDate = patentCaseMetadata['uspat:PatentGrantIdentification']['pat:GrantDate'].toString()
                        }
                        
                        if(patentCaseMetadata.hasOwnProperty('uspat:PartyBag')) {
                            const parties = patentCaseMetadata['uspat:PartyBag'];
                            if(parties.hasOwnProperty('pat:ApplicantBag')) {
                                const listApplicant = parties['pat:ApplicantBag']['pat:Applicant'];
                                if(Array.isArray(listApplicant)) {
                                    const promises = listApplicant.map( applicant => {
                                        const name = applicant['com:PublicationContact'] 
                                        console.log(name)
                                        if(name['com:Name'].hasOwnProperty('com:OrganizationName')) {
                                            const org = name['com:Name']['com:OrganizationName']
                                            console.log(org)
                                            if(org.hasOwnProperty('com:OrganizationStandardName')) {
                                                applicants.push({
                                                    appno_doc_num: applicationNumber, 
                                                    name: org['com:OrganizationStandardName'],
                                                    city: name['com:CityName'],
                                                    state: typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : name['com:GeographicRegionName'],
                                                    country: name['com:CountryCode'],
                                                })
                                            }
                                        } else if(name['com:Name'].hasOwnProperty('com:PersonName')) {
                                            const org = name['com:Name']['com:PersonName']
                                            console.log(org)
                                            if(org.hasOwnProperty('com:PersonStructuredName')) {
                                                const personName = name['com:Name']['com:PersonName']['com:PersonStructuredName']
                                                let fullName = ''
                                                if(personName['com:FirstName'] != '') {
                                                    fullName = personName['com:FirstName']
                                                }
                                                if(personName['com:MiddleName'] != '') {
                                                    fullName += ' ' + personName['com:MiddleName']
                                                }
                                                if(personName['com:LastName'] != '') {
                                                    fullName += ' ' + personName['com:LastName']
                                                } 
                                                applicants.push({
                                                    appno_doc_num: applicationNumber, 
                                                    name: fullName,
                                                    city: name['com:CityName'],
                                                    state: typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : name['com:GeographicRegionName'],
                                                    country: name['com:CountryCode'],
                                                })
                                            }
                                        }
                                    })
                                    await Promise.all(promises)
                                } else {
                                    const name = listApplicant['com:PublicationContact']
                                    if(name['com:Name'].hasOwnProperty('com:OrganizationName')) {
                                        const org = name['com:Name']['com:OrganizationName']
                                        console.log(name)
                                        if(org.hasOwnProperty('com:OrganizationStandardName')) {
                                            applicants.push({
                                                appno_doc_num: applicationNumber, 
                                                name: org['com:OrganizationStandardName'],
                                                city: name['com:CityName'],
                                                state: typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : name['com:GeographicRegionName'],
                                                country: name['com:CountryCode'],
                                            })
                                        }
                                        console.log('name', typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'])
                                    } else if(name['com:Name'].hasOwnProperty('com:PersonName')) { 
                                        const org = name['com:Name']['com:PersonName']
                                        console.log(org)
                                        if(org.hasOwnProperty('com:PersonStructuredName')) {
                                            const personName = name['com:Name']['com:PersonName']['com:PersonStructuredName']
                                            let fullName = ''
                                            if(personName['com:FirstName'] != '') {
                                                fullName = personName['com:FirstName']
                                            }
                                            if(personName['com:MiddleName'] != '') {
                                                fullName += ' ' + personName['com:MiddleName']
                                            }
                                            if(personName['com:LastName'] != '') {
                                                fullName += ' ' + personName['com:LastName']
                                            } 
                                            applicants.push({
                                                appno_doc_num: applicationNumber, 
                                                name: fullName,
                                                city: name['com:CityName'],
                                                state: typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : name['com:GeographicRegionName'],
                                                country: name['com:CountryCode'],
                                            })
                                        }
                                    }
                                } 
                            } 
                            if(parties.hasOwnProperty('pat:InventorBag')) {
                                const listInventors = parties['pat:InventorBag']['pat:Inventor']; 
                                if(Array.isArray(listInventors)) {
                                    const promises = listInventors.map( inventor => {
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

                                        inventors.push({
                                            appno_doc_num: applicationNumber, 
                                            name: fullName.trim(),
                                            first_name: name['com:FirstName'],
                                            middle_name: name['com:MiddleName'],
                                            last_name: name['com:LastName'],
                                            city: invObj['com:CityName'],
                                            state: typeof invObj['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : invObj['com:GeographicRegionName'],
                                            country: invObj['com:CountryCode']
                                        })
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
                                    inventors.push({
                                        appno_doc_num: applicationNumber, 
                                        name: fullName.trim(),
                                        first_name: name['com:FirstName'],
                                        middle_name: name['com:MiddleName'],
                                        last_name: name['com:LastName'],
                                        city: invObj['com:CityName'],
                                        state: typeof invObj['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : invObj['com:GeographicRegionName'],
                                        country: invObj['com:CountryCode']
                                    })
                                }
                            }  
                            if(parties.hasOwnProperty('com:CorrespondenceAddress')) {
                                console.log('FIND CORRESPONDENCE');
                                const correspondenceContact = parties['com:CorrespondenceAddress']['com:Contact']
                                
                                const address = correspondenceContact['com:PostalAddressBag']['com:PostalAddress']['com:PostalStructuredAddress'] 
                                correspondence.push({
                                    appno_doc_num: applicationNumber, 
                                    name: correspondenceContact['com:Name']['com:PersonName']['com:PersonStructuredName']['com:LastName'],
                                    address: Array.isArray(address['com:AddressLineText']) ? address['com:AddressLineText'].join(', ') : address['com:AddressLineText'],
                                    city: address['com:CityName'],
                                    state: typeof address['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? '' : address['com:GeographicRegionName'],
                                    postal: address['com:CountryCode'],
                                    country: address['com:PostalCode']  
                                }) 
                                console.log(correspondence)
                            } 
                        } 
                        if(patentCaseMetadata.hasOwnProperty('uscom:ApplicationStatusCategory')) {
                            applicationStatus.push({
                                appno_doc_num: applicationNumber, 
                                status: patentCaseMetadata['uscom:ApplicationStatusCategory'],
                                status_date: patentCaseMetadata['uscom:ApplicationStatusDate']
                            })
                        } 
    
                        if(patentData.hasOwnProperty('uspat:PatentTermData')) {        
                            const patentTermData = patentData['uspat:PatentTermData'];
                            if(patentTermData.hasOwnProperty('uspat:PatentTermAdjustmentData')) {
                                const termAdjustmentData = patentTermData['uspat:PatentTermAdjustmentData']
                                if(termAdjustmentData.hasOwnProperty('uspat:AdjustmentTotalQuantity')) {
                                    const extensionDays = termAdjustmentData['uspat:AdjustmentTotalQuantity']
            
                                    if(extensionDays > 0) {
                                        applicationExtension.push({
                                            appno_doc_num: applicationNumber,
                                            extension: extensionDays
                                        }) 
                                    }
                                }
                            }
                        } 
                        console.log(applicationNumber, applicationDate, publicationNumber, publicationDate, grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension)
                        await insertUpdateData(applicationNumber, applicationDate, publicationNumber, publicationDate,grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension)
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

const errorWhileAdding = []

const insertUpdateData = async (applicationNumber, applicationDate, publicationNumber, publicationDate,
    grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension) => {

    try {
        const promise1 = await ApplicationPublicationGrant.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        })
    
        const promise2 = await ApplicationExtension.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        })
    
        const promise3 =  await ApplicationApplicants.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        })
    
        const promise4 = await ApplicationInventors.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        });
    
        const promise5 = await ApplicationCorrespondence.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        });
    
        /**
         * Insert or Update
         */
    
        Promise.all([promise1, promise3, promise3, promise4, promise5]).then(async () => {
            console.log('All Destroyed')
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
            await ApplicationCorrespondence.bulkCreate(correspondence, {ignoreDuplicates: true});
        })
    } catch (err) {
        console.log('error while adding')
    }

    

    
} 