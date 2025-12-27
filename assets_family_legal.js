const request = require('request'),
    connection = require("./config/index"),
    epo = require('./epo.js'),
    xml2js = require('xml2js'),    
    fs = require('fs'),

    AssetsFamily = require("./models/AssetsFamily");


/**
 * 
 * Argument
 */    
/**
 * 
 * ./node_modules/.bin/env-cmd node assets_family.js "158"
 */

const argumentSlice = process.argv.slice(2);
//const organisationID = argumentSlice[0];

let grantNumber = argumentSlice[0];

/* const mainFolderPath = process.env.MAIN_FOLDER_PATH , extraDiskPath =   process.env.EXTRA_DISK_PATH,  extraDiskPathApplications =   process.env.EXTRA_DISK_PATH + 'applications/',  extraDiskPathPatents =   process.env.EXTRA_DISK_PATH + 'patent/' */


const extraDiskPath =   '/mnt/volume_sfo2_12/'

let getAssetsList = [], currentIndex = -1;

( async () => { 
try {

    let getFamilyData = '', fileExist = false
    console.log(`Checking XML file in the system : ${extraDiskPath}FAMILY/${grantNumber}.XML`)
    if(grantNumber.indexOf('US') === -1) {
        grantNumber = `US${grantNumber}`
    }
    if (fs.existsSync(`${extraDiskPath}FAMILY/${grantNumber}.XML`)) {
        console.log('FIle Found')
        //file exists
        fileExist = true
        getFamilyData = await fs.promises.readFile(`${extraDiskPath}FAMILY/${grantNumber}.XML`, 'utf8');
    }  
    const token = await epo.readToken('HedCET')  
    console.log('token', token)
    if(token !== 'undefined' && token != '') {
        getFamilyData = await epo.runUrl(token,'family','publication','docdb',`${grantNumber}/legal`);
        if( !getFamilyData ) {
            getFamilyData = await epo.runUrl(token,'family','publication','epodoc',`${grantNumber}/legal`);
        }
    }
    console.log('FAMILY DATA', getFamilyData)
    if( getFamilyData !== '' ) {
        //getFamilyData = getFamilyData.toString().replace("\ufeff", "");
        const parser = new xml2js.Parser
        parser.parseString(getFamilyData, async(err, xmlData) => {
            if (err){
                console.log(err);
            }  else if( xmlData.hasOwnProperty('ops:world-patent-data') ){
                console.log('XML DATA', xmlData) 
                fs.writeFileSync(`${extraDiskPath}FAMILY/${grantNumber}.XML`, getFamilyData, {encoding:'utf8',flag:'w'}); 
                if(fileExist === false) { 
                    console.log('IN ops:world-patent-data')
                    const worldPatentData = xmlData['ops:world-patent-data']
                    if(worldPatentData.hasOwnProperty('ops:patent-family')) {
                        console.log('IN ops:patent-family')
                        const patentFamily =  worldPatentData['ops:patent-family']
                        if( patentFamily.length > 0 && typeof patentFamily[0] !== 'undefined' ) {
                            console.log('IN patentFamily')
                            const familyMembers = patentFamily[0]['ops:family-member']
                            console.log('IN patentFamily', familyMembers.length)
                            if( familyMembers.length > 0 ) {                                
                                let familyID = 0
                                const familyData = []
                                familyMembers.forEach(family => {
                                    let dbTypeData = family['publication-reference'][0]['document-id'][0]
                                    if( dbTypeData.$['document-id-type'] !== 'docdb' ) {
                                        dbTypeData = family['publication-reference'][0]['document-id'][1]
                                    }
                                    if(dbTypeData.hasOwnProperty('doc-number')) {
                                        if((familyID === 0 && dbTypeData['doc-number'] == argumentSlice[0]) || (familyID !== 0 && familyID == family.$['family-id'])) {
                                            if(familyID === 0) {
                                                familyID = family.$['family-id']
                                            }                                            
                                            familyData.push({
                                                family_id: familyID,
                                                grant_doc_num: argumentSlice[0],
                                                patent_number: dbTypeData['doc-number'],
                                                application_number: family['application-reference'][0]['document-id'][0]['doc-number'],
                                                application_country: dbTypeData['country'],
                                                publication_country: dbTypeData['country'],
                                                publication_kind: dbTypeData['kind'],                                            
                                                application_kind: family['application-reference'][0]['document-id'][0]['kind']                                                                        
                                            })
                                        }
                                    }
                                });
                                console.log(familyData)
                                if(familyData.length > 0) {
                                    await AssetsFamily.bulkCreate(familyData, {
                                        ignoreDuplicates: true,
                                    })
                                    console.log('DONE')
                                } else {
                                    console.log('Error')
                                }
                            } else {
                                console.log('Error')
                            }
                        } else {
                            console.log('Error')
                        }
                    } else {
                        console.log('Error')
                    }
                }
            } else {
                console.log('Error')
            }                  
        });
    } else {
        console.log('Error')
    } 
} catch( err ) {
    console.log('Family Data Retrival', err)
}


})(); 






/* const retrieveAssetFamily = async(startIndex) => {
    try {
        const token = await epo.readToken('HedCET')    
        if(token !== 'undefined' && token != '') {
            let grantNumber = getAssetsList[startIndex].grant_doc_num
            if(grantNumber.indexOf('US') === -1) {
                grantNumber = `US${grantNumber}`
            }
            let getFamilyData = '', fileExist = false
            if (fs.existsSync(`${extraDiskPath}FAMILY/${grantNumber}.XML`)) {
                //file exists
                fileExist = true
                getFamilyData = await fs.promises.readFile(`${extraDiskPath}FAMILY/${grantNumber}.XML`, 'utf8');
            } else {
                getFamilyData = await epo.runUrl(token,'family','publication','docdb',`${grantNumber}`);
                if( !getFamilyData ) {
                    getFamilyData = await epo.runUrl(token,'family','publication','epodoc',`${grantNumber}`);
                }
            }
            console.log('TOKEN', token)
           
            if( getFamilyData !== '' ) {
                getFamilyData = getFamilyData.toString().replace("\ufeff", "");
                const parser = new xml2js.Parser
                parser.parseString(getFamilyData, async(err, xmlData) => {
                    if (err){
                        console.log(err);
                        checkNextRow(startIndex)
                    }  else if( xmlData.hasOwnProperty('ops:world-patent-data') ){
                        console.log('XML DATA', xmlData)
                        if(fileExist === false) {
                            fs.writeFileSync(`${extraDiskPath}FAMILY/${grantNumber}.XML`, xmlData.toString());
                        }
                        console.log('IN ops:world-patent-data')
                        const worldPatentData = xmlData['ops:world-patent-data']
                        if(worldPatentData.hasOwnProperty('ops:patent-family')) {
                            console.log('IN ops:patent-family')
                            const patentFamily =  worldPatentData['ops:patent-family']
                            if( patentFamily.length > 0 && typeof patentFamily[0] !== 'undefined' ) {
                                console.log('IN patentFamily')
                                const familyMembers = patentFamily[0]['ops:family-member']
                                console.log('IN patentFamily', familyMembers.length)
                                if( familyMembers.length > 0 ) {                                
                                    let familyID = 0
                                    const familyData = []
                                    familyMembers.forEach(family => {
                                        let dbTypeData = family['publication-reference'][0]['document-id'][0]
                                        if( dbTypeData.$['document-id-type'] !== 'docdb' ) {
                                            dbTypeData = family['publication-reference'][0]['document-id'][1]
                                        }
                                        if(dbTypeData.hasOwnProperty('doc-number')) {
                                            if((familyID === 0 && dbTypeData['doc-number'] == getAssetsList[startIndex].grant_doc_num) || (familyID !== 0 && familyID == family.$['family-id'])) {
                                                if(familyID === 0) {
                                                    familyID = family.$['family-id']
                                                }                                            
                                                familyData.push({
                                                    family_id: familyID,
                                                    grant_doc_num: getAssetsList[startIndex].grant_doc_num,
                                                    patent_number: dbTypeData['doc-number'],
                                                    application_number: family['application-reference'][0]['document-id'][0]['doc-number'],
                                                    application_country: dbTypeData['country'],
                                                    publication_country: dbTypeData['country'],
                                                    publication_kind: dbTypeData['kind'],                                            
                                                    application_kind: family['application-reference'][0]['document-id'][0]['kind']                                                                        
                                                })
                                            }
                                        }
                                    });
                                    if(familyData.length > 0) {
                                        
                                        await AssetsFamily.bulkCreate(familyData, {
                                            ignoreDuplicates: true,
                                        })
                                        checkNextRow(startIndex)
                                    } else {
                                        checkNextRow(startIndex)
                                    }
                                } else {
                                    checkNextRow(startIndex)
                                } 
                            } else {
                                checkNextRow(startIndex)
                            }
                        } else {
                            checkNextRow(startIndex)
                        }
                    } else {
                        checkNextRow(startIndex)
                    }                    
                });
            } else {
                checkNextRow(startIndex)
            }
        }
    } catch( err ) {
        console.log('Family Data Retrival', err)
    }
}


const checkNextRow = (startIndex) => {
    startIndex += 1
	console.log(`checkNextRow : ${startIndex} - ${getAssetsList.length}`)
    if(startIndex < getAssetsList.length) {
        setInterval(() => {
            retrieveAssetFamily(startIndex)
        }, 2000)
    } 
}

const year = 1999;
const queryAssets = `SELECT assets.grant_doc_num, COUNT(apf.grant_doc_num) AS counter FROM assets LEFT JOIN db_uspto.assets_family AS apf ON apf.grant_doc_num = assets.grant_doc_num  WHERE  assets.grant_doc_num <> '' AND assets.organisation_id = :organisationID GROUP BY assets.grant_doc_num HAVING counter = 0`;


( async () => {    
    getAssetsList = await connection.application.query(queryAssets,{
            type: connection.Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: console.log,
            replacements: {organisationID, year},
        }
    );


    if(getAssetsList != null && getAssetsList.length > 0) {
        currentIndex = 0;
        await retrieveAssetFamily(currentIndex) 
    }
})(); */