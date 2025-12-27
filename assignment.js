const fs = require('fs'),
	    path = require('path'),    
	    parser = require('fast-xml-parser'),
	    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');


const extraDiskFolderPath = process.env.EXTRA_DISK_PATH1;
let allFiles = []
const processXMLFiles = new Promise( function(resolve, reject) {
	    /* const child = spawn('find', [`${extraDiskFolderPath}/assignment/bigXML`, '-name', `*.xml`]);
	     *     child.stdout.on('data', (data) => {
	     *             //console.log(`child.stdout: ${data}`)
	     *                     const files = data.toString().split('\n')
	     *                             if(files[files.length - 1] == '') {
	     *                                         files.splice(files.length - 1, 1)
	     *                                                 }
	     *                                                         //console.log(`child.files: ${files.length}`)
	     *                                                                 allFiles = [...allFiles, ...files]
	     *                                                                     });
	     *                                                                         child.stderr.on('data', (data) => {
	     *                                                                                 console.log(`ERRORRRRRRR - ${data}`)
	     *                                                                                         reject(data)
	     *                                                                                             });
	     *                                                                                                 child.on('close', (code) => {
	     *                                                                                                         resolve('AllFolderDOne')    
	     *                                                                                                             }) */  
		    resolve('DONE')
})
  


Promise.all([processXMLFiles])
.then(async () => {
	    console.log(`Files Length -  ${allFiles.length}`)
	    allFiles = [...new Set(allFiles)];
/*	    allFiles = [`${extraDiskFolderPath}/assignment/ad19800101-20201231-06.xml`];*/
	    /*allFiles = ['./XML/ad19800101-20201231-01.xml'];*/
	    console.log(`Unique Files Length -  ${allFiles.length}`)
	    console.log(`${allFiles[0]}`)
	    if(allFiles.length > 0) {
		            await readFile(0)
		        } 
}).catch(err => {
	    console.log(`ERROR: ${err}`)
})

const XMLFromString = async(string) => {

}

let chunks = [], regexp  = /<patent-assignment>/g, regexpEnd  = /<\/patent-assignment>/g; 

const readFile = async (fileIndex) => {
	    chunks = []
	    const fullPath = allFiles[fileIndex]
	    console.log(`FileIndex - ${fileIndex} - ${fullPath}`)
	    const fileName = fullPath.split('/').pop()
	    const folderName = fileName.replace('.xml','')
	    const stream = fs.createReadStream(fullPath, {
		            encoding: 'utf8'
		        })
	    let i = 0;

	    stream
	        .on('data', chunk => {
			            console.log(`I: ${i}`)
			            chunks.push(chunk);  
			            i++;
			        })
	        .on("end", async() => {
			            console.log(chunks.length)
			            if(chunks.length > 0) {
					                    startReadingDataFromChunks(folderName, fileName, fileIndex, 0, '')
					                }
			        });
}


const startReadingDataFromChunks = async(folderName, fileName, fileIndex, index, string) => {
	    let lastString = ''
	    for(let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
		            console.log(`====================================`)
		            console.log(`CURRENT INDEX: ${chunkIndex}`)
		            let stringIndex = chunks[chunkIndex]

		            if( lastString !== '') {
				                stringIndex = lastString + stringIndex
				            }
		        
		            if(stringIndex.indexOf('<?xml') !== null) {
				                const find = stringIndex.indexOf('<us-patent-assignments')
				                if(find !== null) {
							                stringIndex = stringIndex.substring(find - 1, stringIndex.length)
							            }
				            }
		            const indexMain = stringIndex.indexOf('<patent-assignment>')
		            if( indexMain !== null ) {
				                stringIndex = stringIndex.substring(indexMain, stringIndex.length)
				                let matchAll = stringIndex.matchAll(regexp)
				                matchAll = Array.from(matchAll);
				                console.log(`Found START matches: ${matchAll.length}`)
				                if(matchAll.length > 0) {
							                let currentString = stringIndex, matchEnd = currentString.matchAll(regexpEnd);
							                matchEnd = Array.from(matchEnd);
							                console.log(`Found END matches: ${matchEnd.length}`)
							                if(matchEnd.length > 0  ) {
										                    if(matchAll.length !== matchEnd.length) {
													                            console.log(`Start1`)        
													                            const neWXML = currentString.substr( matchAll[0].index, matchAll[matchAll.length - 1].index )
									fs.writeFileSync(`${extraDiskFolderPath}/assignment/XML/${folderName}/${folderName}_${fileName}_${chunkIndex}.xml`, neWXML);
													                            lastString = currentString.substr( matchAll[matchAll.length - 1].index )                    
													                        } else {
																	                        console.log(`Start2`)        
																	                        const neWXML = currentString.substr( matchAll[0].index, matchEnd[matchEnd.length - 1].index + 20 )
									fs.writeFileSync(`${extraDiskFolderPath}/assignmement/XML/${folderName}/${folderName}_${fileName}_${chunkIndex}.xml`, neWXML);
																	                        lastString = ''
																	                    }
										                } else {
													                    console.log(`Start3`)        
													                    lastString = currentString
													                }
							            }
				            }
		        }
	 
	const nextIndex = fileIndex + 1
	if(nextIndex < allFiles.length){
		readFile(nextIndex)
	}
}
