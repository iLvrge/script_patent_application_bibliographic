const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');



const ApplicationPublication = require("./models/ApplicationPublication"),
    Inventors = require("./models/Inventors");

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH;
let allFiles = []
const processXMLFiles = new Promise( function(resolve, reject) {
    const argumentSlice = process.argv.slice(2);
    const year = argumentSlice[0]
    console.log('application', year, `${extraDiskFolderPath}applications/XML`);
    /* const child = spawn('find', [`${extraDiskFolderPath}applications/XML`, '-name', `*-${year}*.XML`]); */
    const child = spawn('find', [`${extraDiskFolderPath}applications/XML`, '-name', `${year}.XML`]);
    child.stdout.on('data', (data) => {
        //console.log(`child.stdout: ${data}`)
        console.log('start searching...');
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
                    let findIndex = data.toString().indexOf('<us-patent-application')
                    
                    if(findIndex !== -1) {
                        let xmlData = data.toString().substring(findIndex, data.length)
                        if(parser.validate(xmlData)) {                        
                            const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                            
                            if(xmlToJSON.hasOwnProperty('us-patent-application')) {                                 
                                const usBibliographic = xmlToJSON['us-patent-application']['us-bibliographic-data-application']
                                const publicationReference = usBibliographic['publication-reference']
                                const applicationReference = usBibliographic['application-reference']  
                                title = usBibliographic['invention-title']['#text'].toString()
                                where =  {
                                    appno_doc_num: applicationReference['document-id']['doc-number'], 
                                    pgpub_doc_num: publicationReference['document-id']['doc-number']
                                }
                                resolve('read')
                            }
                        }                
                    } else {
                        let findIndex = data.toString().indexOf('<patent-application-publication')
                        if(findIndex !== -1) {                
                            let xmlData = data.toString().substring(findIndex, data.length)
                            if(parser.validate(xmlData)) {
                                const xmlToJSON = parser.parse( xmlData, {ignoreAttributes: false});
                                console.log(JSON.stringify(xmlToJSON))
                                if(xmlToJSON.hasOwnProperty('patent-application-publication')) {
                                    const usBibliographic = xmlToJSON['patent-application-publication']['subdoc-bibliographic-information']
                                    const publicationReference = usBibliographic['document-id']
                                    const applicationReference = usBibliographic['domestic-filing-data']
                                    
                                    title = usBibliographic['invention-title']['#text'].toString()
                                    where =  {
                                        appno_doc_num: applicationReference['document-id']['doc-number'], 
                                        pgpub_doc_num: publicationReference['document-id']['doc-number']
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
                        await ApplicationPublication.update({title}, {where}) 
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
