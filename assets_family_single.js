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
const argumentSlice = process.argv.slice(2);
//const organisationID = argumentSlice[0];

let grantNumber = argumentSlice[0];

const extraDiskPath =   '/mnt/volume_sfo2_12/'

let getAssetsList = [], currentIndex = -1;

const getFamilyDataFromFile = async (filePath) => {
    if (!fs.existsSync(filePath)) return null;
    console.log('File Found');
    return await fs.promises.readFile(filePath, 'utf8');
};

const saveFamilyDataToFile = (filePath, data) => {
    fs.writeFileSync(filePath, data);
};

const parseXMLData = async (xmlData) => {
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
        parser.parseString(xmlData, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


const extractFamilyData = async(worldPatentData, grantNumber) => {
    const familyData = [];
    if (worldPatentData['ops:patent-family']) {
        const familyMembers = worldPatentData['ops:patent-family'][0]['ops:family-member'];
        let familyID = 0;
        familyMembers.forEach(family => {
            let dbTypeData = family['publication-reference'][0]['document-id'][0];
            if (dbTypeData.$['document-id-type'] !== 'docdb') {
                dbTypeData = family['publication-reference'][0]['document-id'][1];
            }
            if (dbTypeData.hasOwnProperty('doc-number')) {
                console.log('Finding grantNumber', dbTypeData['doc-number'], grantNumber)
                if ((familyID === 0 && dbTypeData['doc-number'] == grantNumber) || (familyID !== 0 && familyID == family.$['family-id'])) {
                    console.log('Family Found');
                    if (familyID === 0) familyID = family.$['family-id']; 
                    familyData.push({
                        family_id: familyID,
                        grant_doc_num: grantNumber,
                        patent_number: dbTypeData['doc-number'],
                        application_number: family['application-reference'][0]['document-id'][0]['doc-number'],
                        application_country: dbTypeData['country'],
                        publication_country: dbTypeData['country'],
                        publication_kind: dbTypeData['kind'],
                        application_kind: family['application-reference'][0]['document-id'][0]['kind']
                    });
                }
            }
        });
    }
    return familyData;
};

const updateAndRemoveDuplicatesInPlace = (familyData) => {
    let seen = new Map();

    for (let i = 0; i < familyData.length; i++) {
        const item = familyData[i];
        const key = `${item.application_number}-${item.application_country}-${item.publication_country}`;

        if (seen.has(key)) {
            const existingItem = seen.get(key);

            // Update the patent number if it is empty or different
            if ((!existingItem.patent_number || existingItem.patent_number !== item.patent_number) && item.patent_number != '') {
                existingItem.patent_number = item.patent_number;
            }

            // Remove duplicate item from the array
            familyData.splice(i, 1);
            i--; // Adjust the index after removing an item
        } else {
            seen.set(key, item);
        }
    }
    return familyData;
}

async function updateAssetsFamily(connection, grant_doc_num, familyDetails) {
    console.log(connection);
  const transaction = await connection.resourcesRaw.transaction();

  try {
    // Delete existing records
    await AssetsFamily.destroy({
      where: { grant_doc_num },
      transaction
    });

    // Insert new records
    await AssetsFamily.bulkCreate(familyDetails, { 
      ignoreDuplicates: true,
      transaction 
    });

    // Commit the transaction
    await transaction.commit();
    console.log('AssetsFamily updated successfully.');
  } catch (err) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    console.error(`Error updating AssetsFamily: ${err}`);
  }
}


(async () => {
    try {
        let findGrantNumber = grantNumber;
        if (!findGrantNumber.includes('US')) {
            findGrantNumber = `US${findGrantNumber}`;
        }
        if (grantNumber.includes('US')) {
            grantNumber = grantNumber.replace('US', '');
        }
        const filePath = `${extraDiskPath}FAMILY/${findGrantNumber}.XML`;
        let familyData = await getFamilyDataFromFile(filePath);

        if (!familyData) {
            console.log('Fetching data from EPO');
            // Fetch data from EPO logic here
            // Example: familyData = await fetchFamilyDataFromEPO(grantNumber);
            // If fetched data is valid, save it to the file system
            // saveFamilyDataToFile(filePath, familyData);
        }

        if (!familyData) {
            console.log('Error: No family data available');
            return;
        }

        //console.log('FAMILY DATA', familyData);
        const xmlData = await parseXMLData(familyData);

        if (!xmlData['ops:world-patent-data']) {
            console.log('Error: Invalid XML data');
            return;
        }

        const worldPatentData = xmlData['ops:world-patent-data'];
        let familyDetails = await extractFamilyData(worldPatentData, grantNumber);

        if (familyDetails.length === 0) {
            console.log('Error: No family details found');
            return;
        }
        console.log(`Before family details found: ${familyDetails.length}`);
        familyDetails = updateAndRemoveDuplicatesInPlace(familyDetails);
        console.log(`After duplicates family details found: ${familyDetails.length}`);
         
        await updateAssetsFamily(connection, grantNumber, familyDetails);
        console.log('DONE');
    } catch (err) {
        console.log('Family Data Retrieval Error:', err);
    }
})();