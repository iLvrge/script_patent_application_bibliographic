const fs = require('fs'),
    path = require('path'),    
    process = require('process'),
    XmlStream = require('xml-stream'),
    moment = require('moment'),
    connection = require("../config/index");
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
    const argumentSlice = process.argv.slice(2)
    console.log(argumentSlice, process.argv.slice)
    const child = spawn('find', [`/mnt/volume_sfo2_12`, '-name', argumentSlice[0]]);
    
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
                            applicationNumber = typeof patentCaseMetadata['uscom:ApplicationNumberText']['#text'] != 'undefined' ? patentCaseMetadata['uscom:ApplicationNumberText']['#text'].toString() : ''
                        }
                        if(patentCaseMetadata.hasOwnProperty('pat:FilingDate')) {
                            applicationDate = typeof patentCaseMetadata['pat:FilingDate'] != 'undefined' ? patentCaseMetadata['pat:FilingDate'].toString() : ''
                        }
                        if(patentCaseMetadata.hasOwnProperty('uspat:PatentPublicationIdentification')) {
                            publicationNumber = typeof patentCaseMetadata['uspat:PatentPublicationIdentification']['pat:PublicationNumber'] != 'undefined' ? patentCaseMetadata['uspat:PatentPublicationIdentification']['pat:PublicationNumber'].toString() : ''
                            publicationDate = typeof patentCaseMetadata['uspat:PatentPublicationIdentification']['com:PublicationDate'] != 'undefined' ? patentCaseMetadata['uspat:PatentPublicationIdentification']['com:PublicationDate'].toString() : ''
                        }
                        if(patentCaseMetadata.hasOwnProperty('uspat:PatentGrantIdentification')) {
                            grantNumber = typeof patentCaseMetadata['uspat:PatentGrantIdentification']['pat:PatentNumber'] != 'undefined' ? patentCaseMetadata['uspat:PatentGrantIdentification']['pat:PatentNumber'].toString() : ''
                            grantDate = typeof patentCaseMetadata['uspat:PatentGrantIdentification']['pat:GrantDate'] != 'undefined' ? patentCaseMetadata['uspat:PatentGrantIdentification']['pat:GrantDate'].toString() : ''
                        }
                        
                        if(patentCaseMetadata.hasOwnProperty('uspat:PartyBag')) {
                            const parties = patentCaseMetadata['uspat:PartyBag'];
                            if(parties.hasOwnProperty('pat:ApplicantBag')) {
                                const listApplicant = parties['pat:ApplicantBag']['pat:Applicant'];
                                if(Array.isArray(listApplicant)) {
                                    const promises = listApplicant.map( applicant => {
                                        const name = applicant['com:PublicationContact'] 
                                        //console.log('name', typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'])
                                        applicants.push({
                                            appno_doc_num: applicationNumber, 
                                            name: typeof name['com:Name']['com:OrganizationName']['com:OrganizationStandardName'] != 'undefined' ? name['com:Name']['com:OrganizationName']['com:OrganizationStandardName'].toString() : name['com:Name']['com:OrganizationName'].toString(),
                                            city: name['com:CityName'].toString(),
                                            state: typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? name['com:GeographicRegionName']['@_com:geographicRegionCategory'].toString() : name['com:GeographicRegionName'].toString(),
                                            country: name['com:CountryCode'].toString(),
                                        })
                                    })
                                    await Promise.all(promises)
                                } else {
                                    const name = listApplicant['com:PublicationContact']
                                    //console.log('name', typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'])
                                    applicants.push({
                                        appno_doc_num: applicationNumber, 
                                        name: typeof name['com:Name']['com:OrganizationName']['com:OrganizationStandardName'] != 'undefined' ? name['com:Name']['com:OrganizationName']['com:OrganizationStandardName'].toString() : name['com:Name']['com:OrganizationName']['com:OrganizationStandardName'],
                                        city: name['com:CityName'].toString(),
                                        state: typeof name['com:GeographicRegionName']['@_com:geographicRegionCategory'] != 'undefined' ? name['com:GeographicRegionName']['@_com:geographicRegionCategory'].toString() : name['com:GeographicRegionName'].toString(),
                                        country: name['com:CountryCode'].toString(),
                                    })
                                } 
                            } 
                            if(parties.hasOwnProperty('pat:InventorBag')) {
                                const listInventors = parties['pat:InventorBag']['pat:Inventor']; 
                                if(Array.isArray(listInventors)) {
                                    const promises = listInventors.map( inventor => {
                                        const name = inventor['com:PublicationContact']['com:Name']['com:PersonName']['com:PersonStructuredName']
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
                                            last_name: name['com:LastName']
                                        })
                                    })
                                    await Promise.all(promises)
                                } else {
                                    const name = listInventors['com:PublicationContact']['com:Name']['com:PersonName']['com:PersonStructuredName']
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
                                        last_name: name['com:LastName']
                                    })
                                }
                            }  
                            if(parties.hasOwnProperty('com:CorrespondenceAddress')) {
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
                            const extensionPatentTermAdjustmentData = patentTermData['uspat:PatentTermAdjustmentData']
                            if(typeof extensionPatentTermAdjustmentData['uspat:AdjustmentTotalQuantity'] != 'undefined') {
                                const extensionDays = patentTermData['uspat:PatentTermAdjustmentData']['uspat:AdjustmentTotalQuantity'] 
                                if(extensionDays > 0) {
                                    applicationExtension.push({
                                        appno_doc_num: applicationNumber,
                                        extension: extensionDays
                                    }) 
                                }
                            }
                            
                        } 
                        //console.log(applicationNumber, applicationDate, publicationNumber, publicationDate, grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension)


                        
                        await insertUpdateData(applicationNumber, applicationDate, publicationNumber, publicationDate,
                            grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension)
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
        console.log(applicationNumber, applicationDate, publicationNumber, publicationDate,
            grantNumber, grantDate, inventors, applicants, correspondence, applicationStatus, applicationExtension)


    try{
       /*  const queryDelete = `DELETE t1, t2, t3, t4, t5, t6
        FROM application_publication_grant t1
        LEFT JOIN application_extension t2 ON t1.appno_doc_num = t2.appno_doc_num
        LEFT JOIN application_applicant t3 ON t1.appno_doc_num = t3.appno_doc_num
        LEFT JOIN application_inventor t4 ON t1.appno_doc_num = t4.appno_doc_num
        LEFT JOIN application_status t5 ON t1.appno_doc_num = t5.appno_doc_num
        LEFT JOIN application_correspondence t6 ON t1.appno_doc_num = t6.appno_doc_num
        WHERE t1.appno_doc_num = :applicationNumber AND t1.pgpub_doc_num = :publicationNumber AND t1.grant_doc_num = :grantNumber`
        console.log('queryDelete', queryDelete)
        await connection.applicationPED.query( queryDelete,{
            type: connection.Sequelize.QueryTypes.SELECT,
            raw: true,
            replacements: {applicationNumber, publicationNumber, grantNumber} ,
            logging: console.log,
        }); */

        /* await ApplicationPublicationGrant.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        }) */
    } catch (e) {
        //console.log('All Once destroy', e)
    }

    /* try {
        await ApplicationExtension.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        }) 
    } catch (e) {
        console.log('ApplicationExtension destroy', e)
    }

    try {

        await ApplicationApplicants.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        })
    } catch (e) {
        console.log('ApplicationApplicants destroy', e)
    }

    try {

        await ApplicationInventors.destroy({
            where: {
                appno_doc_num: applicationNumber
            }
        });
    } catch (e) {
        console.log('ApplicationInventors destroy', e)
    } */

     /**
     * Insert or Update
     */


    (async () => {
        
        let transaction ;
        try {
            transaction = await connection.applicationPED.transaction({
                isolationLevel: connection.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
            });
            await ApplicationPublicationGrant.destroy({
                where: {
                    appno_doc_num: applicationNumber
                }, transaction
            }) 

            await ApplicationExtension.destroy({
                where: {
                    appno_doc_num: applicationNumber
                }, transaction
            }) 

            await ApplicationApplicants.destroy({
                where: {
                    appno_doc_num: applicationNumber
                }, transaction
            })

            await ApplicationInventors.destroy({
                where: {
                    appno_doc_num: applicationNumber
                }, transaction
            });

            await ApplicationStatus.destroy({
                where: {
                    appno_doc_num: applicationNumber
                }, transaction
            });

            await ApplicationCorrespondence.destroy({
                where: {
                    appno_doc_num: applicationNumber
                }, transaction
            });

            console.log('ApplicationPublicationGrant', {
                appno_doc_num: applicationNumber,
                appno_date: applicationDate,
                pgpub_doc_num: publicationNumber,
                pgpub_date: publicationDate,
                grant_doc_num: grantNumber,
                grant_date: grantDate
            });

            await ApplicationPublicationGrant.create({
                appno_doc_num: applicationNumber,
                appno_date: applicationDate,
                pgpub_doc_num: publicationNumber,
                pgpub_date: publicationDate,
                grant_doc_num: grantNumber,
                grant_date: grantDate
            }, { transaction});

            console.log('applicationStatus', applicationStatus);
            await ApplicationStatus.bulkCreate(applicationStatus, {ignoreDuplicates: true, transaction});

            console.log('applicationExtension', applicationExtension);
            await ApplicationExtension.bulkCreate(applicationExtension, {ignoreDuplicates: true, transaction});

            console.log('applicants', applicants);
            await ApplicationApplicants.bulkCreate(applicants, {ignoreDuplicates: true, transaction});

            console.log('inventors', inventors);
            await ApplicationInventors.bulkCreate(inventors, {ignoreDuplicates: true, transaction});

            console.log('correspondence', correspondence);
            await ApplicationCorrespondence.bulkCreate(correspondence, {ignoreDuplicates: true, transaction});
      
            // Commit the transaction
            await transaction.commit();
            console.log('Transaction committed successfully.');
        } catch (error) {
          // Rollback the transaction if any error occurs
            if(typeof transaction.rollback == 'function') {
                await transaction.rollback();
            }
            console.error('Transaction rolled back:', error);
        }
    })();

    /* try {
        console.log('ApplicationPublicationGrant', {
            appno_doc_num: applicationNumber,
            appno_date: applicationDate,
            pgpub_doc_num: publicationNumber,
            pgpub_date: publicationDate,
            grant_doc_num: grantNumber,
            grant_date: grantDate
        });
        await ApplicationPublicationGrant.create({
            appno_doc_num: applicationNumber,
            appno_date: applicationDate,
            pgpub_doc_num: publicationNumber,
            pgpub_date: publicationDate,
            grant_doc_num: grantNumber,
            grant_date: grantDate
        });
    } catch (e) {
        console.log('ApplicationPublicationGrant', e)
    }

    try {
        console.log('applicationStatus', applicationStatus);
        await ApplicationStatus.bulkCreate(applicationStatus, {ignoreDuplicates: true});
    } catch (e) {
        console.log('ApplicationStatus', e)
    }

    try {
        console.log('applicationExtension', applicationExtension);
        await ApplicationExtension.bulkCreate(applicationExtension, {ignoreDuplicates: true});
    } catch (e) {
        console.log('ApplicationExtension', e)
    }

    try {
        console.log('applicants', applicants);
        await ApplicationApplicants.bulkCreate(applicants, {ignoreDuplicates: true});
    } catch (e) {
        console.log('ApplicationApplicants', e)
    }

    try {
        console.log('inventors', inventors);
        await ApplicationInventors.bulkCreate(inventors, {ignoreDuplicates: true});
    } catch (e) {
        console.log('ApplicationInventors', e)
    }

    try {
        console.log('correspondence', correspondence);
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
    } catch (e) {
        console.log('ApplicationCorrespondence', e)
    } */
} 