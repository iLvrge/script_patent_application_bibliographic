const fs = require('fs'),
	    path = require('path'),    
	    parser = require('fast-xml-parser'),
	    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH1, extraDiskFolderPath2 = process.env.EXTRA_DISK_PATH6, currentFolder = process.env.CURRENT_PATH, LIMIT = 100;

const directoryExist = (index) => {
		const directoryName = `${extraDiskFolderPath}images${index}/`
		if (fs.existsSync(directoryName)) {
					exec('find '+directoryName+' -name "*.TIF" | while read f; do echo "Converting ${f}"; tiff2png ${f}; done', (err, stdout, stderr) => {
console.log(`STDOUT: ${stdout}`)
						console.log(`STDERR: ${stderr}`)
						if(!err) {				
														exec(`aws s3 cp ${directoryName} s3://static.patentrack.com/figures/ --recursive  --acl public-read-write --include "*.png"`, (error, stdout, stderr) => {
																				if(!error) {
																											
																											exec(`find ${directoryName} -name "*.png" -type f -delete`,(e, o, s)=>{
																																		
																																		})
																											
																											exec(`find ${directoryName} -name "*.TIF" -type f -delete`,(e, o, s)=>{
																																		
																																		})
																											
																											const nextIndex = index++
																											if(nextIndex <= 100) {
																																			directoryExist(nextIndex)
																																		}
																										}
																			})
													}
								})
				} else {
							const nextIndex = index++
							if(nextIndex <= 100) {
											directoryExist(nextIndex)
										}
						}
}
(async() => {
		directoryExist(1)
})()


