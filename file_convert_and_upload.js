const fs = require('fs');

const { exec, spawn  } = require('child_process');

const mainFolderPath = process.env.MAIN_FOLDER_PATH;

const extraDiskFolderPath = process.env.EXTRA_DISK_PATH;

const AWS  = require('aws-sdk');


const config = require("./config/index");

let allFiles = ['part30.zip', 'part31.zip', 'part32.zip', 'part33.zip', 'part34.zip', 'part35.zip'], startIndex = 0


const uploadFileToAWSAndDelete = (startIndex) => {
    const dirName = allFiles[startIndex].replace('.zip', '')
    console.log('IN uploadFileToAWSAndDelete DIR NAME: ', dirName)
    console.log('COMMANDDD.............................................')
    console.log('find '+ process.env.EXTRA_DISK_PATH10 + 'script/' + dirName +'/. -name "*.TIF" | while read f; do echo "Converting ${f}"; tiff2png ${f}; done')
    exec('find '+ process.env.EXTRA_DISK_PATH10 + 'script/' + dirName +'/. -name "*.TIF" | while read f; do echo "Converting ${f}"; tiff2png ${f}; done', (err, stdout, stderr) => {
        if(!err) {
            console.log('ALL FILES CONVERTED........................................', err, stdout, stderr)
            exec('aws s3 cp '+ process.env.EXTRA_DISK_PATH10 + 'script/' + dirName +'/ s3://static.patentrack.com/figures/ --recursive  --acl public-read-write --include "*.png"', (err1, stdout1, stderr1) => {
                if(!err1) {
                    console.log('ALL FILES UPLOADED TO S3.................................', err1, stdout1, stderr1)
                    exec('find '+ process.env.EXTRA_DISK_PATH10 + 'script/' + dirName +'/. -name "*.png" -type f -delete', (err2, stdout2, stderr2) => {
                        if(!err2) {
                            console.log('ALL FILES PNG DELETED.................................', err2, stdout2, stderr2)
                            exec('find '+ process.env.EXTRA_DISK_PATH10 + 'script/' + dirName +'/. -name "*.TIF" -type f -delete', (err3, stdout3, stderr3) => {
                                if(!err3) {
                                    console.log('ALL FILES TIF DELETED.................................', err3, stdout3, stderr3)
                                    moveToNextDIR(startIndex)
                                } else {
                                    console.log('ERROR IN FILE TIF DELETION..............................', err3)
                                }
                            })
                        } else {
                            console.log('ERROR IN FILE PNG DELETION..............................', err2)
                        }
                    })
                } else {
                    console.log('ERROR IN FILE UPLOADING..............................', err1)
                }
            })
        } else {
            console.log('ERROR IN FILE CONVERSION..............................', err)
        }
    })
}

const moveToNextDIR = (startIndex) => {
    startIndex += 1

    if(startIndex < allFiles.length) {
        moveFile(startIndex)
    }
}

const moveFile = (startIndex) => {
   /* console.log(`${process.env.EXTRA_DISK_PATH}${allFiles[startIndex]}`, `${process.env.EXTRA_DISK_PATH10}`)
    const child = spawn('mv', [`${process.env.EXTRA_DISK_PATH}${allFiles[startIndex]}`, `${process.env.EXTRA_DISK_PATH10}`]);
    child.stdout.on('data', (data) => {
        console.log(`child.stdout: ${data}`)
        
    });
    child.stderr.on('data', (data) => {
        console.log('DATA REJECTED', data)
    });
    child.on('close', (code) => {
        console.log('AllFolderDone')    
       
        const unZip = spawn('unzip', [`${process.env.EXTRA_DISK_PATH10}${allFiles[startIndex]}`]);
        unZip.stdout.on('data', (data) => {
            console.log(`unzipchild.stdout: ${data}`)

        });
        unZip.stderr.on('data', (data) => {
            console.log('DATA REJECTED', data)
        });
        unZip.on('close', (code) => {
            uploadFileToAWSAndDelete(startIndex)
        })
    })  */
    

    const dirName = "part30"

        const child = spawn('find', [
            `${process.env.EXTRA_DISK_PATH10}`, 
            "script/", 
            `${dirName}`, 
            "/.", 
            "-name",
            "*.TIF",
            "|",
            "while",
            "read",
            "f;",
            "do",
            "echo",
            '"Converting ${f}";',
            "tiff2png",
            "${f};",
            "done"
        ]);
        child.stdout.on('data', (data) => {
            console.log(`CONVERSION child.stdout: ${data}`)
            
        });
        child.stderr.on('data', (data) => {
            console.log('CONVERSION  DATA REJECTED', data)
        });
        child.on('close', (code) => {
            console.log('CONVERSION DONE')   
        }
}

(async () => {
    moveFile(startIndex)
})()


