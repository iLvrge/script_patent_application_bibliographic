
const fs = require('fs');
const levenshtein = require('fast-levenshtein');
const natural = require("natural");
const moment = require('moment');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const { exec, spawn  } = require("child_process");

const connection = require("./config/index"),
    AssignorAndAssignee = require("./models/AssignorAndAssignee"),
    ApplicantAssignorAndAssignee = require("./models/ApplicantAssignorAndAssignee"),
    Representatives = require("./models/Representatives"),
    ClientRepesentative = require("./models/client/Representatives"),
    Organisations = require("./models/Organisations");



const sortWordsByLength = (name) => {
    // Split name into words
    const words = name.split(' ');
    // Sort words by the number of letters in descending order
    words.sort((a, b) => b.length - a.length);
    return words;
};
 

const inventorSortNames = async(names) => {
    /**
     * Each name is sorted by the number of characters in each word in a descending order
     * Take the first two word from left and sort the name alphabetically
     */
    const regex = /[.,]/g ;
    for (let i = 0; i < names.length; i++) { 
        let name = names[i].name 
        name = name.replace(regex, '')  

        names[i]['new_sorted_name'] = sortWordsByLength(name.toLowerCase()).slice(0, 2).sort().join(' '); 
    }
    return names
}

const inventorGroupSuggestions = async (entitiesList) => {
    console.log('calling inventorGroupSuggestions')
    const names = await inventorSortNames([...entitiesList]); 
    //console.log('names sorted', JSON.stringify(names))
    /**
     * Normalize names with the same two most left words, where representative is the name with the highest occurence
     */ 
    console.log("Name sorting DOne")
    let suggestedGroups = [], otherSuggested = []; 
    for (let i = 0; i < names.length; i++) {
        console.log(`nameSimilar-${i}`, names[i].name, names[i].new_sorted_name.toLowerCase())
        for (let j = i + 1; j < names.length; j++) {
            /**
             * two most left words is same or not
             */
            let nameSimilar = names[j].name, nameChecked = names[i].name;
            //console.log('Checked -- ', nameSimilar, names[j].new_sorted_name.toLowerCase())
            if(!otherSuggested.includes(nameSimilar)) { 
                if(names[i].new_sorted_name.toLowerCase() == names[j].new_sorted_name.toLowerCase()) {
                    if (suggestedGroups[nameChecked]) {
                        suggestedGroups[nameChecked]['groups'].push(names[j]);
                        otherSuggested.push(nameSimilar);
                    } else {
                        suggestedGroups[nameChecked] = {
                            main: names[i],
                            groups: [names[j]]
                        }
                        otherSuggested.push(nameSimilar);
                    } 
                }
            }
        }
    } 
    console.log('suggestedGroups', Object.keys(suggestedGroups).length)
    if(Object.keys(suggestedGroups).length > 0 ) {
        await normalizedSimilarNames(suggestedGroups); 
    } 
    return inventorGroupLevenshtein(names)
}

let saveFile = async (entitiesList, orgID, representatives, type, searchType) => {
    const fileName =  `normalizeNames_${orgID}_${representatives.length > 0 ? representatives.join('') + '_file' : 'file'}.json`
    console.log('fileName', fileName, representatives, type)
    if(entitiesList.length > 0) { 
        const jsonArray = JSON.stringify(entitiesList)
        fs.writeFile(`${__dirname}/${fileName}`, jsonArray, {encoding: 'utf8', flag:'w'}, async function (err,data) {
            if (err) {
                console.log('Error in file', err) 
            } else {
                console.log('File Uploaded') 
    
                 /**
                 * Send push notification
                 */
                /* await sendNotification(`${searchType == 1 ? 'Inventor ': ''}Normalized similar name finished. Filename is ${fileName}`) */
                await sendNotification(`Normalized similar name finished. Filename is ${fileName}`)
                return []
            }                    
        })
    } else {
        await sendNotification(`No group found`)
        try{
            fs.unlinkSync(`${__dirname}/${fileName}`);
        } catch(error) {
            if (error.code === 'ENOENT') {
                console.log('File does not exist.');
            } else {
                console.error('Error deleting file:', error.message);
            }
        }
        
        return [] 
    }
}

let getCompaniesList = async (DBConnection) => {
    const Representative = DBConnection.define('ClientRepesentative', ClientRepesentative.mainStructure, ClientRepesentative.options);

    return await Representative.findAll({
        where: { type: 0}
    });
}



let findOrganisationbyID = async (organisationID) => {
    //console.log('findOrganisationbyID')
    return await Organisations.findOne({
                    where: {organisation_id: organisationID}
                });
}

let connect = async(orgID) => {
    console.log("connection");

    const organisation = await findOrganisationbyID(orgID);
    //console.log("organisation", organisation)
    if( organisation != null && organisation.organisation_id > 0) {
        console.log("IN ORGGGGGGGGGGGGG")
        /**
         * Make DB Connection
         */
        try{
            const newConnection = new Sequelize(organisation.org_db, organisation.org_usr, organisation.org_pass, {
                host: organisation.org_host,
                dialect: 'mysql',
                operatorsAliases: Op,
               
                /*pool: {
                    max: 100,
                    min: 1,
                    acquire: 1000000,
                    idle: 5000
                }*/
            });
            return newConnection;
        } catch( err ){
            console.log(err);
            console.log("Unable to connect with client DB....");
            return null;
        }
    } else {
        /**
         * No organistation exist.
         */
        return null;
    }
}

/**
 * With CompanyID
 * @param {*} orgID 
 * @param {*} type 
 * @param {*} DBConnection 
 * @param {*} suggestions 
 * @param {*} fixed_identicals 
 * @returns 
 */
let findCompanyEntitiesByAccountID = async(orgID, type, suggestions, fixed_identicals) => {
    const DBConnection = await connect(orgID)
    
    //console.log('DBConnection', DBConnection)
    
    const list = await getCompaniesList(DBConnection);


    console.log("LIST", list)
    let entitiesList = [];
    if(list.length > 0) {
        await sendNotification('Normalize name in process');
        const IDs = [];
        /* list.map(r => IDs.push(r.representative_id)); */
        list.map(r => r.company_id > 0 ? IDs.push(r.company_id) : '');
        let listIDs = [];

        if(IDs.length > 0) {
            const queryRepresentativeTransactions = "SELECT rf_id FROM list2 where ( organisation_id = :organisationID OR organisation_id IS NULL ) AND company_id IN (:representativeIDs) GROUP BY rf_id";
            console.log(queryRepresentativeTransactions, IDs)
            listIDs = await connection.resourcesRaw.query(queryRepresentativeTransactions,{
                type: connection.Sequelize.QueryTypes.SELECT,
                replacements: { representativeIDs: IDs, organisationID: 0 /* orgID */ },
                raw: true,
                logging: console.log,
                }
            );
                console.log(listIDs.length)
            if(listIDs.length > 0) {
                const rfIDs = [];
                listIDs.map( r => rfIDs.push(r.rf_id));
                entitiesList = await findAssignorAndAssigneeListFromRFIDs(rfIDs, type);
                console.log('entitiesList', entitiesList.length);
                console.log('suggestions', suggestions)
                if(typeof suggestions != 'undefined' && suggestions == 1) {
                    console.log('TYPE', type);
                    if(type == 1) {
                        entitiesList = await inventorSortNames(entitiesList)
                        entitiesList = await inventorGroupLevenshtein(entitiesList)
                    } else {
                        console.log("SENDING FOR ORG")
                        entitiesList = await groupOrganisationSuggestions(entitiesList)
                        console.log("AFTER ORG")
                        console.log('entitiesList', entitiesList)
                    }
                }
                if(typeof fixed_identicals != 'undefined' && fixed_identicals == 1) {
                    if(type == 1) {
                        entitiesList = await inventorGroupSuggestions(entitiesList)
                    }
                }  
            } 
        }
    }
    console.log('Calling Save File 220', entitiesList.length)
    saveFile(entitiesList, orgID, [], 1, type);
    //return entitiesList;
}

/**
 * By Account
 * @param {*} orgID 
 * @param {*} representativeIDs 
 * @param {*} type 
 * @param {*} DBConnection 
 * @param {*} suggestions 
 * @param {*} fixed_identicals 
 * @returns 
 */

let findCompanyEntitiesByAccountIDByRepresentativeIDs = async(orgID, representativeIDs, type, suggestions, fixed_identicals) => {
   
    let entitiesList = [];
    if(representativeIDs.length > 0) {        
        const queryRepresentativeTransactions = "SELECT rf_id FROM list2 where ( organisation_id = :organisationID OR organisation_id IS NULL ) AND company_id IN (:representativeIDs)";
        console.log('queryRepresentativeTransactions', queryRepresentativeTransactions)
        const listIDs = await connection.resourcesRaw.query(queryRepresentativeTransactions,{
            type: connection.Sequelize.QueryTypes.SELECT,
            replacements: { representativeIDs: representativeIDs, organisationID: 0 /* orgID */ },
            raw: true,
            logging: console.log,
            }
        );
        console.log(listIDs.length)
        if(listIDs.length > 0) {
            const rfIDs = [];
                listIDs.map( r => rfIDs.push(r.rf_id));
                entitiesList = await findAssignorAndAssigneeListFromRFIDs(rfIDs, type);
                console.log('entitiesList', entitiesList.length)
            console.log('suggestions', suggestions)
            if(typeof suggestions != 'undefined' && suggestions == 1) {
                if(type == 1) {
                    console.log("Inventor Sort")
                    entitiesList = await inventorSortNames(entitiesList) 
                    entitiesList = await inventorGroupLevenshtein(entitiesList)
                } else {
                    entitiesList = await groupOrganisationSuggestions(entitiesList)
                }
            }
            if(typeof fixed_identicals != 'undefined' && fixed_identicals == 1) {
                if(type == 1) {
                    console.log("Inventor Grouped Suggestions")
                    entitiesList = await inventorGroupSuggestions(entitiesList)
                }
            } 
        } 
    }
    console.log('Calling Save File 273', entitiesList.length)
    saveFile(entitiesList, orgID, representativeIDs, 2, type);

    //return entitiesList;
}

const inventorGroupLevenshtein = async(names) => { 
    // Check for similar names and group them
    const suggestedGroups = {}, otherSuggested = [];
    let newSuggestedSet = [], allNamesID = [];
    for (let i = 0; i < names.length; i++) {
        for (let j = i + 1; j < names.length; j++) {
            if(!otherSuggested.includes(names[j].name) && (names[j].normalize_name == '' || names[j].normalize_name == null) && names[i].id != names[j].id) {
                const checkRepresentative = names[i].normalize_name;
                let distance1 = 5;
                if(checkRepresentative != '' && checkRepresentative != null) { 
                    const newRepresentativeName = sortWordsByLength(checkRepresentative).slice(0, 2).sort().join(' ');  
                    distance1 = levenshtein.get(newRepresentativeName.toLowerCase(), names[j].new_sorted_name.toLowerCase())
                }
                const distance2 = levenshtein.get(names[i].new_sorted_name.toLowerCase(), names[j].new_sorted_name.toLowerCase())
                const distance = Math.min(distance1, distance2)
                /* console.log(distance, names[j].normalize_name,  names[i].id,  names[j].id) */
                if(distance < 3 ) {
                    let nameSimilar = names[j].name, nameChecked = names[i].name;
                    if (suggestedGroups[nameChecked]) {
                        suggestedGroups[nameChecked].push(nameSimilar);
                        otherSuggested.push(nameSimilar)
                    } else {
                        if(!otherSuggested.includes(nameChecked)) {
                            suggestedGroups[nameChecked] = [nameSimilar];
                            otherSuggested.push(nameSimilar)
                        }
                    }
                }
            }
        }
    }
    console.log('suggestedGroups', Object.keys(suggestedGroups).length)
    // Print suggested groups with correct name
    /* try {
        await connection.resourcesRaw.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    } */
    /**
     * Better to reconnect with Pooling
     */ 
    const findAllNamesInRepresentative = [], findAllNamesInRepresentativeData = []
    for (const name in suggestedGroups) {
        const group = suggestedGroups[name]; 
        if(group.length > 0) {
            let correctName = "";
            let highestOccurrences = 0;
            const findIndex = names.findIndex( row => row.name == name)
            if(findIndex !== -1) { 
                let newGroup = [] 
                allNamesID.push(names[findIndex].id)
                group.map( grp => {
                    if(name != grp) {
                        const grpIndex = names.findIndex( row => row.name == grp)
                        //console.log('grpIndex', grpIndex, grp, name)
                        if(grpIndex !== -1) {
                            if(!allNamesID.includes(names[grpIndex].id)) {  
                                newGroup.push(names[grpIndex]) 
                                allNamesID.push(names[grpIndex].id)
                            }
                        }
                    }
                })
                if(newGroup.length > 0) {
                    const rowInsert = {
                        groups: newGroup,
                        correctName, 
                        highestOccurrences,
                        loopData: names[findIndex],
                        normalizeName: null
                    }
                    if(names[findIndex].normalize_name != null) { 
                        findAllNamesInRepresentative.push(names[findIndex].normalize_name)
                        rowInsert['normalizeName'] =  names[findIndex].normalize_name
                        
                    }  
                    findAllNamesInRepresentativeData.push(rowInsert)
                }
            }
        }
    }

    console.log(findAllNamesInRepresentative)

    if(findAllNamesInRepresentative.length > 0) {

        const newConnection  = await connection.reconnectResourcesRawToDatabaseWithPooling()
        let findRepresentativeData = null, itemsNotFound = [];
        let queryRepresentative = "SELECT a.assignor_and_assignee_id, a.assignor_and_assignee_id AS id, a.or_name as name, count(a.or_name) as counter, r.representative_name as normalize_name,  aaa.name AS nName, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, (SELECT aa.instances FROM assignor_and_assignee as aa WHERE aa.assignor_and_assignee_id = a.assignor_and_assignee_id GROUP BY aa.assignor_and_assignee_id) as total_occurences, a.rf_id, 1 AS flag FROM db_uspto.assignor as a LEFT JOIN assignor_and_assignee as aaa ON aaa.assignor_and_assignee_id = a.assignor_and_assignee_id LEFT JOIN db_uspto.representative_assignment_conveyance as rac ON rac.rf_id = a.rf_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name IN (:representativeName)  GROUP BY a.or_name";  
        findRepresentativeData = await newConnection.query(queryRepresentative,{
            type: connection.Sequelize.QueryTypes.SELECT,
            replacements: { representativeName: findAllNamesInRepresentative },
            raw: true, 
            logging: console.log,
        });  

        if(findRepresentativeData.length == 0) {
            queryRepresentative = "SELECT * FROM (SELECT appInv.assignor_and_assignee_id, appInv.assignor_and_assignee_id AS id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_application_bibliographic.inventor AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name IN (:representativeName) GROUP BY aaa.name UNION SELECT appInv.assignor_and_assignee_id, appInv.assignor_and_assignee_id AS id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_grant_bibliographic.inventor_new AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name IN (:representativeName) GROUP BY aaa.name) AS temp "; 
            findRepresentativeData = await newConnection.query(queryRepresentative,{
                    type: connection.Sequelize.QueryTypes.SELECT,
                    replacements: { representativeName: findAllNamesInRepresentative },
                    raw: true, 
                    logging: console.log,
                }   
            ); 
        } else {
            /**
             * Remaining find it from Inventors Tbl
             */

            findAllNamesInRepresentative.forEach( item => {
                const findIndex = findRepresentativeData.findIndex(row => row.nName == item)
                if(findIndex == -1){
                    itemsNotFound.push(item)
                }
            })
            console.log('itemsNotFound', itemsNotFound)
            

            if(itemsNotFound.length > 0) {
                queryRepresentative = "SELECT * FROM (SELECT appInv.assignor_and_assignee_id, appInv.assignor_and_assignee_id AS id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_application_bibliographic.inventor AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name IN (:representativeName) GROUP BY aaa.name UNION SELECT appInv.assignor_and_assignee_id, appInv.assignor_and_assignee_id AS id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_grant_bibliographic.inventor_new AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name IN (:representativeName) GROUP BY aaa.name) AS temp "; 
                const findRepresentativeInventorData = await newConnection.query(queryRepresentative,{
                        type: connection.Sequelize.QueryTypes.SELECT,
                        replacements: { representativeName: itemsNotFound },
                        raw: true, 
                        logging: console.log,
                    }   
                ); 

                if(findRepresentativeInventorData.length > 0) {
                    const representativeDataFound = [];

                    const promise1 = findRepresentativeData.map( item => {
                        representativeDataFound.push(item)
                    })
                    const promise2 = findRepresentativeInventorData.map( item => {
                        representativeDataFound.push(item)
                    })

                    await Promise.all(promise1, promise2)
                    if(representativeDataFound.length > 0) { 
                        findRepresentativeData = [...representativeDataFound]
                    } 
                }
            }
        }

        if(findRepresentativeData.length > 0) {
            const promise = findAllNamesInRepresentativeData.map( rowData => {
                const {groups, loopData, normalizeName, correctName, highestOccurrences} = rowData;
    
                if(normalizeName != null) {
                    const findIndex = findRepresentativeData.findIndex( itemData => itemData.name == normalizeName)
                    let representData = {}
                    if(findIndex !== -1) {
                        representData = {...findRepresentativeData[findIndex] , correctName, highestOccurrences} 
                    } else {
                        representData = {...loopData , correctName, highestOccurrences} 
                    } 
                    newSuggestedSet.push(representData) 
                    newSuggestedSet = [...newSuggestedSet, ...groups]  
                } else {
                    const assembleData = {...loopData , correctName, highestOccurrences}
                    newSuggestedSet.push(assembleData) 
                    newSuggestedSet = [...newSuggestedSet, ...groups] 
                }
            })
            await Promise.all(promise)
        } else {
            const collectDataPromises = findAllNamesInRepresentativeData.map( rowData => {
                const {groups, loopData, correctName, highestOccurrences} = rowData;
                const assembleData = {...loopData , correctName, highestOccurrences}
                newSuggestedSet.push(assembleData) 
                newSuggestedSet = [...newSuggestedSet, ...groups] 
            });
            await Promise.all(collectDataPromises)
        } 
        newConnection.close()
    } 

    return newSuggestedSet

/* 
    let reconnectionResourcesRaw = await connection.reconnectResourcesRawToDatabaseWithPooling() 

    if(reconnectionResourcesRaw != null) {
        for (const name in suggestedGroups) {
            const group = suggestedGroups[name]; 
            //group.push(name); 
            //console.log(`${name} - ${group.length}`)
            if(group.length > 0) {
                // Find the name with the highest occurrences that doesn't have a middle name
                let correctName = "";
                let highestOccurrences = 0;
                const findIndex = names.findIndex( row => row.name == name)
                //console.log(`findIndex`, name, findIndex)
                if(findIndex !== -1) { 
                    let newGroup = [] 
                    allNamesID.push(names[findIndex].id)
                    group.map( grp => {
                        if(name != grp) {
                            const grpIndex = names.findIndex( row => row.name == grp)
                            //console.log('grpIndex', grpIndex, grp, name)
                            if(grpIndex !== -1) {
                                if(!allNamesID.includes(names[grpIndex].id)) {  
                                    newGroup.push(names[grpIndex]) 
                                    allNamesID.push(names[grpIndex].id)
                                }
                            }
                        }
                    })
                    try {
                        if(newGroup.length > 0) {
                            let findRepresentativeData = null;
                            if(names[findIndex].normalize_name != null) { 
                                let queryRepresentative = "SELECT a.assignor_and_assignee_id, a.assignor_and_assignee_id AS id, a.or_name as name, count(a.or_name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, (SELECT aa.instances FROM assignor_and_assignee as aa WHERE aa.assignor_and_assignee_id = a.assignor_and_assignee_id GROUP BY aa.assignor_and_assignee_id) as total_occurences, a.rf_id, 1 AS flag FROM db_uspto.assignor as a LEFT JOIN assignor_and_assignee as aaa ON aaa.assignor_and_assignee_id = a.assignor_and_assignee_id LEFT JOIN db_uspto.representative_assignment_conveyance as rac ON rac.rf_id = a.rf_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name = :representativeName  GROUP BY a.or_name LIMIT 1";  
                                
                                try {
                                    await reconnectionResourcesRaw.authenticate();
                                    console.log('Connection has been established successfully.');
                                } catch (error) { 
                                    reconnectionResourcesRaw = await connection.reconnectResourcesRawToDatabase() 
                                }
                                if(reconnectionResourcesRaw != null) {
                                    findRepresentativeData = await reconnectionResourcesRaw.query(queryRepresentative,{
                                        type: connection.Sequelize.QueryTypes.SELECT,
                                        replacements: { representativeName: names[findIndex].normalize_name },
                                        raw: true,
                                        plain: true,
                                        logging: console.log,
                                    });  
                                    if(findRepresentativeData == null) {
                                        queryRepresentative = "SELECT * FROM (SELECT appInv.assignor_and_assignee_id, appInv.assignor_and_assignee_id AS id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_application_bibliographic.inventor AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name = :representativeName GROUP BY aaa.name UNION SELECT appInv.assignor_and_assignee_id, , appInv.assignor_and_assignee_id AS id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_grant_bibliographic.inventor_new AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE aaa.name = :representativeName GROUP BY aaa.name) AS temp LIMIT 1"; 
                                        findRepresentativeData = await connection.resourcesRaw.query(queryRepresentative,{
                                                type: connection.Sequelize.QueryTypes.SELECT,
                                                replacements: { representativeName: names[findIndex].normalize_name },
                                                raw: true,
                                                plain: true,
                                                logging: console.log,
                                            }   
                                        );  
                                    }
                                }
                            }
                            if(findRepresentativeData == null) {
                                findRepresentativeData = {...names[findIndex]}
                            } 
                            const rowData = {...findRepresentativeData, correctName, highestOccurrences} 
                            newSuggestedSet.push(rowData) 
                            newSuggestedSet = [...newSuggestedSet, ...newGroup] 
                        }
                    } catch (error) {
                        console.error('Error executing query:', error.message);
                        // Handle the error, retry the query, or implement appropriate logic
                    }
                }
            } 
        }
    } 
    
    return newSuggestedSet;  */
}


const normalizedSimilarNames = async (getIdenticalList) => {
    console.log('normalizedSimilarNames', Object.keys(getIdenticalList).length)
    if(Object.keys(getIdenticalList).length > 0 ) { 
        for (const name in getIdenticalList) { 
            const {main, groups} = getIdenticalList[name];

            //console.log('main, groups', main, groups);
            try {
                if(groups.length > 0) {
                    let representativeName = '', representativeID = 0;
                    if(main.representative_company != null) {
                        representativeName = main.representative_company 
                    } else {
                        const allNames = []
                        allNames.push(main.name)
                        groups.forEach( item => {
                            allNames.push(item.name)
                        })
                        if(allNames.length > 0) {
                            const findRepresentative = await Representatives.findOne({
                                attributes:['representative_name', 'representative_id'],
                                where: {representative_name: allNames}
                            })
                            if(findRepresentative != null) {
                                representativeName = findRepresentative.representative_name
                                representativeID = findRepresentative.representative_id
                            } else {
                                /**
                                 * Create Representative
                                 */
                                let createRepresentativeName = main.name, highestDistance = main.counter
    
                                groups.forEach( item => {
                                    if(parseInt(item.counter) >= parseInt(highestDistance)) {
                                        createRepresentativeName = item.name
                                        highestDistance = item.counter
                                    }
                                })
                                //console.log('createRepresentativeName', createRepresentativeName, highestDistance)
                                if(createRepresentativeName != '') {
                                    const representativeCompany = await Representatives.create({
                                        representative_name: createRepresentativeName
                                    });
                                    if(representativeCompany != null) {
                                        representativeName = representativeCompany.representative_name
                                        representativeID = representativeCompany.representative_id
                                    }
                                } 
                            }
                        }
                    }
                    if(representativeName != '' && groups.length > 0) {
                        if(representativeID == 0) {
                            const findRepresentative = await Representatives.findOne({
                                where: {representative_name: representativeName}
                            })
                            if(findRepresentative != null) {
                                representativeID = findRepresentative.representative_id
                            }
                        }
                        const allAssignorAndAssignee = [], allApplicantAssignorAndAssignee = []
                        if(main.normalize_name == null) {
                            if(main.flag == 1) {
                                allAssignorAndAssignee.push(main.id)
                            } else {
                                allApplicantAssignorAndAssignee.push(main.id)
                            }
                        }
    
                        groups.forEach( item => {
                            if(item.flag == 1) {
                                if(item.normalize_name == null) {
                                    allAssignorAndAssignee.push(item.id)
                                }
                            } else if(item.flag == 4) {
                                if(item.normalize_name == null) {
                                    allApplicantAssignorAndAssignee.push(item.id)
                                } 
                            }
                        })
    
                        if(representativeID > 0 && (allAssignorAndAssignee.length > 0 || allApplicantAssignorAndAssignee.length > 0)) {
                            const item = {representative_id: representativeID};
    
                            if(allAssignorAndAssignee.length > 0) {
                                await AssignorAndAssignee.update(item, {where: {assignor_and_assignee_id: allAssignorAndAssignee}}); 
                            }
    
                            if(allApplicantAssignorAndAssignee.length > 0) {
                                await ApplicantAssignorAndAssignee.update(item, {where: {assignor_and_assignee_id: allApplicantAssignorAndAssignee}}); 
                            }
                        } 
                    }  
                } 
            } catch (err) {
                console.log('Error is coming in normalizedSimilarNames', err)
            } 
        }
    }
}



const groupOrganisationSuggestions = async (entitiesList) => {
    // sample subset array of organizations with names and occurrences
    const orgs =  [...entitiesList]
   
    // function to group similar names and suggest correct name 
    // create an empty object to store groups of similar names
    const groups = {}, allNames = [], otherSuggested = [];
    console.log(`groupOrganisationSuggestions: ${orgs.length}`)

    for (let i = 0; i < orgs.length; i++) {
        allNames.push(orgs[i].name)
        for (let j = i + 1; j < orgs.length; j++) {
            if(!otherSuggested.includes(orgs[j].name) && (orgs[j].normalize_name == '' || orgs[j].normalize_name == null) && orgs[i].id != orgs[j].id) {
                const checkRepresentative = orgs[i].normalize_name;
                let distance1 = 5;
                if(checkRepresentative != '' && checkRepresentative != null) {  
                    distance1 = levenshtein.get(checkRepresentative.toLowerCase(), orgs[j].name.toLowerCase())
                }
                const distance2 = levenshtein.get(orgs[i].name.toLowerCase(), orgs[j].name.toLowerCase())
                const distance = Math.min(distance1, distance2)
                 console.log(distance, orgs[j].normalize_name,  orgs[i].id,  orgs[j].id) 
                if(distance < 3 ) {
                    let nameSimilar = orgs[j].name, nameChecked = orgs[i].name;
                    if (groups[nameChecked]) {
                        groups[nameChecked].push(orgs[j]);
                        otherSuggested.push(nameSimilar)
                    } else {
                        if(!otherSuggested.includes(nameChecked)) {
                            groups[nameChecked] = [orgs[j]];
                            otherSuggested.push(nameSimilar)
                        }
                    }
                }
            }
        }
    } 
    console.log(`groups:`, groups)
    let newSuggestedSet = [], allOrgID = [];
    const spellcheck = new natural.Spellcheck(allNames);
    // loop through the groups and suggest the correct name
    for (let group in groups) {
        // array to store names with the least number of typos
        let correctNames = '', highestOccurrences = 0;
        let minDistance = Number.MAX_SAFE_INTEGER;
    
        groups[group].forEach((org) => {
            // use spell checker to check for typos 
            let distance = spellcheck.getCorrections(org.name, 1);
            console.log(`distance: ${distance}`)
            if(distance.length > 0 && org.name != group) {
                correctNames = [org.name];
                highestOccurrences = org.counter
            }
        });
        const findIndex = orgs.findIndex( row => row.name == group)
        if(findIndex !== -1) { 
            
            if(groups[group].length > 0) {
                allOrgID.push(orgs[findIndex].id)
                let newGroup = []
                groups[group].map((org) => {
                    if(!allOrgID.includes(org.id)) { 
                        newGroup.push(org)
                        allOrgID.push(org.id)
                    }
                })
                if(newGroup.length > 0) {
                    const rowData = {...orgs[findIndex], correctName: correctNames, highestOccurrences} 
                    newSuggestedSet.push(rowData)
                    newSuggestedSet = [...newSuggestedSet, ...newGroup]
                }
            }
        } 
    } 
    console.log(`groups newSuggestedSet: ${newSuggestedSet.length}`)
    return newSuggestedSet; 
}


let findAssignorAndAssigneeListFromRFIDs = async(rfIDs, type) => {
    let customer_list = [], assignees = [], assignors = [], inventors = [];
    
    if(typeof type != 'undefined' &&  parseInt(type) < 3) { 
        await sendNotification('Normalize name in process');
        let queryAssignor = "SELECT a.assignor_and_assignee_id, a.or_name as name, count(a.or_name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, (SELECT aa.instances FROM assignor_and_assignee as aa WHERE aa.assignor_and_assignee_id = a.assignor_and_assignee_id GROUP BY aa.assignor_and_assignee_id) as total_occurences, a.rf_id, 1 AS flag FROM db_uspto.assignor as a LEFT JOIN assignor_and_assignee as aaa ON aaa.assignor_and_assignee_id = a.assignor_and_assignee_id LEFT JOIN db_uspto.representative_assignment_conveyance as rac ON rac.rf_id = a.rf_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE date_format(a.exec_dt, '%Y') > :year AND a.rf_id IN (SELECT rf_id FROM documentid WHERE appno_doc_num IN (SELECT appno_doc_num FROM documentid WHERE rf_id IN (:IDs)) GROUP BY rf_id) "; 
        if(parseInt(type) > 0) { 
            if(parseInt(type) == 1) {
                queryAssignor += " AND (rac.employer_assign = 1) ";
            } else {
                queryAssignor += " AND (rac.employer_assign = 0) ";
            }
        }

        queryAssignor += " GROUP BY a.or_name ";

        if(parseInt(type) > 0) { 
            if(parseInt(type) == 1) {

                const queryAssets = "SELECT appno_doc_num FROM documentid WHERE rf_id IN (:IDs) AND date_format(appno_date, '%Y') > :year GROUP BY appno_doc_num"  

                const assetsList = await connection.resourcesRaw.query(queryAssets,{
                    type: connection.Sequelize.QueryTypes.SELECT,
                    replacements: { IDs: rfIDs, year: connection.DEFAULT_YEAR },
                    raw: true,
                    logging: console.log,
                    }   
                );

                const allAssets = []

                assetsList.forEach( row => {
                    allAssets.push(`${row.appno_doc_num}`)
                })
                console.log('assetsList', allAssets.length)
                if(allAssets.length > 0) {
                    const grantInventorsQuery = "SELECT * FROM (SELECT appInv.assignor_and_assignee_id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_application_bibliographic.inventor AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE appInv.appno_doc_num IN (:allAssets)  GROUP BY aaa.name UNION SELECT appInv.assignor_and_assignee_id, CONCAT(appInv.family_name, ' ', appInv.given_name) AS aName, aaa.name AS name, count(aaa.name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, aaa.instances as total_occurences, 0 AS rf_id, 4 AS flag FROM db_patent_grant_bibliographic.inventor_new AS appInv INNER JOIN  db_patent_application_bibliographic.assignor_and_assignee AS aaa ON aaa.assignor_and_assignee_id = appInv.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE appInv.appno_doc_num IN (:allAssets) GROUP BY aaa.name) AS temp";

                    inventors = await connection.resourcesRaw.query(grantInventorsQuery,{
                        type: connection.Sequelize.QueryTypes.SELECT,
                        replacements: { allAssets },
                        raw: true,
                        logging: console.log,
                        }
                    );
                } 
            }
        }
        
        if(parseInt(type) == 2) { 
            queryAssignor += " UNION  SELECT a.assignor_and_assignee_id, a.ee_name as name, count(a.ee_name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, (SELECT aa.instances FROM assignor_and_assignee as aa WHERE aa.assignor_and_assignee_id = a.assignor_and_assignee_id  GROUP BY aa.assignor_and_assignee_id) as total_occurences, a.rf_id, 1 AS flag FROM db_uspto.assignee as a INNER JOIN representative_assignment_conveyance as ac ON ac.rf_id = a.rf_id LEFT JOIN assignor_and_assignee as aaa ON aaa.assignor_and_assignee_id = a.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id WHERE a.rf_id IN (:IDs)  GROUP BY a.ee_name";
        }
        
        
        console.log('RUN QUERYYRYRYRYRRYRYYR', queryAssignor)
        assignors = await connection.resourcesRaw.query(queryAssignor,{
            type: connection.Sequelize.QueryTypes.SELECT,
            replacements: { IDs: rfIDs , year: connection.DEFAULT_YEAR },
            raw: true,
            logging: console.log,
            }
        ); 
    } else if(typeof type != 'undefined' &&  parseInt(type) == 3) { 

        let queryAssignor = `SELECT assignor_and_assignee_id, name, SUM(counter) AS counter, normalize_name, representativeCompany, total_occurences, rf_id, flag FROM (SELECT a.assignor_and_assignee_id, a.or_name as name, count(a.or_name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, (SELECT aa.instances FROM assignor_and_assignee as aa WHERE aa.assignor_and_assignee_id = a.assignor_and_assignee_id  GROUP BY aa.assignor_and_assignee_id) as total_occurences, a.rf_id, 1 AS flag FROM assignor as a INNER JOIN assignor_and_assignee as aaa ON aaa.assignor_and_assignee_id = a.assignor_and_assignee_id INNER JOIN representative_assignment_conveyance as rac ON rac.rf_id = a.rf_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id LEFT JOIN inventors AS inv ON inv.assignor_and_assignee_id = aaa.assignor_and_assignee_id WHERE inv.assignor_and_assignee_id IS NULL AND a.rf_id IN (SELECT rf_id FROM documentid WHERE appno_doc_num IN (SELECT appno_doc_num FROM documentid WHERE rf_id IN (:rfIDs) AND date_format(appno_date, '%Y') > :year ) GROUP BY rf_id) AND rac.employer_assign = 0   GROUP BY a.or_name
        UNION ALL
        SELECT a.assignor_and_assignee_id, a.ee_name as name, count(a.ee_name) as counter, r.representative_name as normalize_name, (select rr.representative_name FROM representative as rr WHERE rr.representative_name = aaa.name GROUP BY rr.representative_name) as representativeCompany, (SELECT aa.instances FROM assignor_and_assignee as aa WHERE aa.assignor_and_assignee_id = a.assignor_and_assignee_id  GROUP BY aa.assignor_and_assignee_id) as total_occurences, a.rf_id, 1 AS flag  FROM assignee as a INNER JOIN representative_assignment_conveyance as ac ON ac.rf_id = a.rf_id INNER JOIN assignor_and_assignee as aaa ON aaa.assignor_and_assignee_id = a.assignor_and_assignee_id LEFT JOIN representative as r ON r.representative_id = aaa.representative_id LEFT JOIN inventors AS inv ON inv.assignor_and_assignee_id = aaa.assignor_and_assignee_id WHERE inv.assignor_and_assignee_id IS NULL AND  a.rf_id IN (SELECT rf_id FROM documentid WHERE appno_doc_num IN (SELECT appno_doc_num FROM documentid WHERE rf_id IN (:rfIDs) AND date_format(appno_date, '%Y') > :year) GROUP BY rf_id) GROUP BY a.ee_name) AS temp GROUP BY name`;

       
        assignors = await connection.resourcesRaw.query(queryAssignor,{
            type: connection.Sequelize.QueryTypes.SELECT,
            replacements: { rfIDs, year: connection.DEFAULT_YEAR },
            raw: true,
            logging: console.log,
            }
        );
    }

    //console.log('ASSIGNORRRRRRRRRRRRRRR', assignors.length)
    
    customer_list = await [...assignees, ...assignors, ...inventors];   
   let list = [];
    
    if(customer_list.length > 0) {
        let names = [];
        customer_list.forEach( async name => {
            let n = name.normalize_name;
            if(n == "" || n == null || n != undefined){
                n = name.name;
            }
            n = n.trim().toLowerCase();
            if(!names.includes(n)){
                await names.push(n);
            }
        })
        for(let i = 0; i < names.length; i++) {
            let nam = names[i];
            let getList = await customer_list.filter(n => {
                let name = n.name;
                name = name.trim().toLowerCase();
                return (name == nam.trim().toLowerCase())? n : undefined;
            })
            if(getList != undefined && getList.length > 0){
                let getCounter = await getList.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a.counter), 0);
                await list.push({id: getList[0].assignor_and_assignee_id, name: getList[0].name, normalize_name: getList[0].normalize_name, counter: getCounter, total_occurences: getList[0].total_occurences, representative_company: getList[0].representativeCompany, rf_id: getList[0].rf_id, flag: getList[0].flag});
            }
        }
    }

    console.log('list.length', list.length)
    
    if(list.length > 0){
        list.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
    }
    return list;
} 

let sendNotification = async(message) => {
    await exec(`node /var/www/html/script/send_push_notification.js "${message}"`, async (error, std, stderr) => {
        console.log(message)
        return []
    }) 
}


(async () => {

    const argumentSlice = process.argv.slice(2);
    if(argumentSlice.length > 0) {
        await sendNotification(`Request Recieved`)
        let orgID = argumentSlice[0],
            representatives = argumentSlice[1],
            type = argumentSlice[2],
            suggestions = argumentSlice[3],
            fixed_identicals = argumentSlice[4];

        if(representatives != '[]' && representatives != null) {
            representatives = JSON.parse(representatives)
        }

        

        


        if(representatives != '[]' && representatives != null && representatives.length > 0) {
            await findCompanyEntitiesByAccountIDByRepresentativeIDs(orgID, representatives, type, suggestions, fixed_identicals)
        } else {
            await findCompanyEntitiesByAccountID(orgID, type, suggestions, fixed_identicals)
        } 
    }
})()