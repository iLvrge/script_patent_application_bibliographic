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
const argumentSlice = process.argv.slice(2);
const year = argumentSlice[0]
console.log('patent', year);
/* const child = spawn('find', [`${extraDiskFolderPath}patent/XML`, '-name', `*-${year}*.XML`]); */
const child = spawn('find', [`${extraDiskFolderPath}patent/XML`, '-name', `${year}.XML`]);
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
            let title = '', where = {}

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
                            title = usBibliographic['invention-title']['#text'].toString()
                            where = {
                                appno_doc_num: applicationReference['document-id']['doc-number'], 
                                grant_doc_num: publicationReference['document-id']['doc-number']
                            } 
                            resolve('read')
                        }
                    }                
                } else {
                    let findIndex = data.toString().indexOf('<PATDOC')
                    if(findIndex !== -1) {                
                        let xmlData = data.toString().substring(findIndex, data.length)
                        let fileString = xmlData
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
                                

                                const findIndexOpenB540 = fileString.toString().indexOf('<B540>')
                                const findIndexClosingB540 = fileString.toString().indexOf('</B540>')
                                let usTitle = fileString.substring(findIndexOpenB540, findIndexClosingB540 + 8)
                                const titleToJSON = parser.parse( usTitle, {ignoreAttributes: false});

                                
                                title = titleToJSON['B540']['STEXT']['PDAT'].toString()
                                console.log(title)
                                where = {
                                    appno_doc_num: applicationReference['B210']['DNUM']['PDAT'].toString(), 
                                    grant_doc_num: publicationReference['B110']['DNUM']['PDAT'].toString()
                                }   
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
                console.log(title, where) 
                if(title != '' && Object.keys(where).length > 0) {
                    await GrantApplication.update({title}, {where}) 
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
