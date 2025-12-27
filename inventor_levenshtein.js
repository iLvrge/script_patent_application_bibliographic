const levenshtein = require('fast-levenshtein'),
    connection = require("./config/index");



const argumentSlice = process.argv.slice(2)
const fileName = argumentSlice[0]
let companyIDs = argumentSlice[1]


const fs = require('fs');

fs.readFile(fileName, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        if (data != '') { 
            const assignors = JSON.parse(data);

            const findAssignorsWithLenvenshtein = []

            if(companyIDs != '') {
                companyIDs = JSON.parse(companyIDs);
            }

            if (assignors.length > 0) {
                /**
                 * Remainng RFIDs
                 */

                (async () => { 


                    const queryList1 = "SELECT ass.rf_id FROM db_uspto.assignee AS ass INNER JOIN db_uspto.assignment_conveyance AS ac ON ac.rf_id = ass.rf_id  AND  ac.convey_ty IN ('missing', 'other', 'govern', 'assignment', 'employee', 'correct', 'namechg') INNER JOIN db_uspto.list2 AS li On li.rf_id = ass.rf_id AND (organisation_id = 0 OR organisation_id IS NULL) AND company_id IN (:companies) GROUP BY ass.rf_id";

                    const rfIDsResult = await connection.application.query(queryList1, {
                        type: connection.Sequelize.QueryTypes.SELECT,
                        raw: true,
                        replacements: { companies: companyIDs }, 
                    });

                    const list1 = [], assets = [];
                    
                    if (rfIDsResult.length > 0) {
                        const promises = rfIDsResult.map( row => {
                            list1.push(row.rf_id);
                        }) 

                        await Promise.all(promises)
                    }
                        
                    if(list1.length > 0) {
                        const queryList2 = "SELECT MAX(doc.appno_doc_num) AS appno_doc_num FROM db_uspto.documentid AS doc WHERE appno_doc_num <> '' AND rf_id IN (:list1) GROUP BY appno_doc_num"; 

                        const resultList2 = await connection.application.query(queryList2, {
                            type: connection.Sequelize.QueryTypes.SELECT,
                            raw: true,
                            replacements: { list1 }, 
                        });

                        if(resultList2.length > 0) {
                            const listPromise = resultList2.map( row => {
                                assets.push(row.appno_doc_num);

                                if(row.appno_doc_num.substr(0, 1)  == '0') {
                                    assets.push(row.appno_doc_num.substr(1, row.appno_doc_num.length))
                                }
                            })
                        } 
                    }


                    const allRemainingAssignors = `  SELECT name FROM db_uspto.assignor_and_assignee WHERE assignor_and_assignee_id IN (SELECT assignor_and_assignee_id FROM db_uspto.assignor WHERE rf_id IN (:rf_id)) GROUP BY name`;
                
                    const partiesResult = await connection.application.query(allRemainingAssignors, {
                        type: connection.Sequelize.QueryTypes.SELECT,
                        raw: true,
                        replacements: { rf_id: assignors }, 
                    });
                    
                    if (partiesResult.length > 0) {
                        const allInventor = `  SELECT given_name, middle_name, family_name FROM (SELECT IF(given_name <> '', CONCAT(' ', given_name), '') AS given_name, IF(middle_name <> '', CONCAT(' ', middle_name), '') AS middle_name, IF(family_name <> '', CONCAT(' ', family_name), '') AS family_name FROM db_patent_application_bibliographic.inventor WHERE appno_doc_num IN (:assets) GROUP BY given_name, middle_name, family_name UNION SELECT  IF(given_name <> '', CONCAT(' ', given_name), '') AS given_name, IF(middle_name <> '', CONCAT(' ', middle_name), '') AS middle_name, IF(family_name <> '', CONCAT(' ', family_name), '') AS family_name  FROM db_patent_grant_bibliographic.inventor WHERE appno_doc_num IN (:assets) GROUP BY given_name, middle_name, family_name  ) AS temp  GROUP BY given_name, middle_name, family_name `;
                        
                        const inventorsResult = await connection.application.query(allInventor, {
                            type: connection.Sequelize.QueryTypes.SELECT,
                            raw: true,
                            replacements: { assets }, 
                        });

                        
                        
                        if (inventorsResult.length > 0) {
                            for (let i = 0; i < partiesResult.length; i++) {
                                let name = partiesResult[i].name; 
                                let flag = 0;
                                for (let j = 0; j < inventorsResult.length; j++) {
                                    let name1 = '';
                                    if (inventorsResult[j].family_name != '') {
                                        name1 += inventorsResult[j].family_name.trim();
                                    }

                                    if (inventorsResult[j].middle_name != '') {
                                        name1 += ' ' + inventorsResult[j].middle_name.trim();
                                    }

                                    if (inventorsResult[j].given_name != '') {
                                        name1 += ' ' + inventorsResult[j].given_name.trim();
                                    }

                                    let name2 = '';
                                    if (inventorsResult[j].given_name != '') {
                                        name2 += inventorsResult[j].given_name.trim();
                                    }

                                    if (inventorsResult[j].middle_name != '') {
                                        name2 += ' ' + inventorsResult[j].middle_name.trim();
                                    }

                                    if (inventorsResult[j].family_name != '') {
                                        name2 += ' ' + inventorsResult[j].family_name.trim();
                                    }


                                    let name3 = '';
                                    if (inventorsResult[j].family_name != '') {
                                        name3 += inventorsResult[j].family_name.trim();
                                    }

                                    if (inventorsResult[j].given_name != '') {
                                        name3 += ' ' + inventorsResult[j].given_name.trim();
                                    }

                                    if (inventorsResult[j].middle_name != '') {
                                        name3 += ' ' + inventorsResult[j].middle_name.trim();
                                    }

                                    let name4 = '';
                                    if (inventorsResult[j].given_name != '') {
                                        name4 += inventorsResult[j].given_name.trim();
                                    }

                                    if (inventorsResult[j].family_name != '') {
                                        name4 += ' ' + inventorsResult[j].family_name.trim();
                                    }

                                    if (inventorsResult[j].middle_name != '') {
                                        name4 += ' ' + inventorsResult[j].middle_name.trim();
                                    }

                                    let name5 = '';
                                    if (inventorsResult[j].family_name != '') {
                                        name5 += inventorsResult[j].family_name.trim();
                                    }

                                    if (inventorsResult[j].given_name != '') {
                                        name5 += ' ' + inventorsResult[j].given_name.trim();
                                    }

                                    let name6 = '';
                                    if (inventorsResult[j].given_name != '') {
                                        name6 += inventorsResult[j].given_name.trim();
                                    }

                                    if (inventorsResult[j].family_name != '') {
                                        name6 += ' ' + inventorsResult[j].family_name.trim();
                                    }


                                    let distance1 = levenshtein.get(name, name1);
                                    let distance2 = levenshtein.get(name, name2);
                                    let distance3 = levenshtein.get(name, name3);
                                    let distance4 = levenshtein.get(name, name4);
                                    let distance5 = levenshtein.get(name, name5);
                                    let distance6 = levenshtein.get(name, name6); 
                                    console.log('distnace', name, name1, name2, name3, name3, name4, name5, name6, distance1, distance2, distance3, distance4, distance5, distance6)
                                    let distance = Math.min(distance1, distance2, distance3, distance4, distance5, distance6);
                                    if (distance < 5) {
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (flag === 1) {
                                    findAssignorsWithLenvenshtein.push(name)
                                }
                            } 


                            if(findAssignorsWithLenvenshtein.length > 0) {
                                const updateAssignors = `SELECT rf_id FROM db_uspto.assignor WHERE rf_id IN (:rf_id) AND  assignor_and_assignee_id IN (SELECT assignor_and_assignee_id FROM db_uspto.assignor_and_assignee WHERE name IN (:names)) GROUP BY rf_id`;
                
                                const getRFIDS = await connection.application.query(updateAssignors, {
                                    type: connection.Sequelize.QueryTypes.SELECT,
                                    raw: true, 
                                    replacements: { rf_id: assignors, names: findAssignorsWithLenvenshtein }, 
                                });

                                if(getRFIDS.length > 0){
                                    const allRFIDS = []
                                    for(let k = 0; k < getRFIDS.length; k++) {
                                        allRFIDS.push(getRFIDS[k].rf_id)
                                    }
                                    const updateAssignment =  "UPDATE db_uspto.representative_assignment_conveyance SET employer_assign = :flag, convey_ty = :convey_ty WHERE rf_id IN (:rf_id) AND convey_ty IN (:conveyance) ";

                                    const updateRFIDS = await connection.application.query(updateAssignment, {
                                        type: connection.Sequelize.QueryTypes.UPDATE,
                                        raw: true,
                                        plain: true,
                                        replacements: { flag: 1, convey_ty: 'employee', rf_id: allRFIDS, conveyance: ['missing', 'other', 'govern', 'assignment', 'employee', 'correct', 'namechg'] }, 
                                    }); 

                                const queryINSERT = "INSERT IGNORE INTO db_uspto.inventors(assignor_and_assignee_id) SELECT assignor_and_assignee_id FROM db_uspto.assignor WHERE rf_id IN (:allRFIDS)";
                                    await connection.application.query(queryINSERT, {
                                        type: connection.Sequelize.QueryTypes.INSERT,
                                        raw: true,
                                        plain: true,
                                        replacements: {  allRFIDS  }, 
                                    }); 

                                }
                            } 
                        }
                    } 
                })();
            }
        }
    } else {
        console.log(err)
    }
})


 

