const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');


 
const GrantExtension = require("./models/GrantExtension");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH;
let allFiles = []

const processXMLFiles = new Promise( function(resolve, reject) {
    const argumentSlice = process.argv.slice(2);
    const year = argumentSlice[0]
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
                let extensionData = []

                const promise = new Promise( (resolve, reject) => {
                    let findIndex = data.toString().indexOf('<us-patent-grant')
                    if(findIndex !== -1) {
                        let xmlData = data.toString().substring(findIndex, data.length)
                        if(parser.validate(xmlData)) {                        
                            const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                            /**
                             * Term Extension
                             */
                            if(xmlToJSON.hasOwnProperty('us-patent-grant')) {                                 
                                const usBibliographic = xmlToJSON['us-patent-grant']['us-bibliographic-data-grant']
                                const publicationReference = usBibliographic['publication-reference']
                                const applicationReference = usBibliographic['application-reference']
                                const grantTerm = usBibliographic['us-term-of-grant']
                                
                                if(typeof grantTerm === "object") {
                                    extensionData.push({
                                        appno_doc_num:  applicationReference.hasOwnProperty('document-id') ? applicationReference['document-id']['doc-number']: applicationReference['application-number']['doc-number'], 
                                        extension: grantTerm['us-term-extension'] 
                                    })
                                } 
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
                                    if(usBibliographic.hasOwnProperty('B400')) {
                                        const grantExtension = usBibliographic['B400']
                                        const grantExtensionProp = grantExtension['B472'];
                                        if(grantExtensionProp.hasOwnProperty('B474US')) {
                                            extensionData.push({
                                                appno_doc_num: applicationReference['B210']['DNUM']['PDAT'].toString(),
                                                extension: grantExtensionProp['B474US']['PDAT'].toString() 
                                            })
                                        }
                                    }
                                    resolve('read')
                                } 
                            }  
                        } else {
                            reject('extensionData not found')
                        }
                    }
                });
                console.log('extensionData', extensionData);
                promise
                .then(async () => {
                    console.log(extensionData);
                    
                    if(extensionData.length > 0 ) {
                        await GrantExtension.bulkCreate(extensionData,  {ignoreDuplicates: true})
                    } else {
                        console.log(`No extensionData - ${fullPath}`);
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
