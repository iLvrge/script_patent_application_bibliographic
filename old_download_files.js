const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser'),
    moment = require('moment');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');

const ApplicationDetails = require("./models/ApplicationDetails"),
    ApplicationClaims = require("./models/ApplicationClaims"),
    ApplicationFigures = require("./models/ApplicationFigures"),
    ApplicationSpecifications = require("./models/ApplicationSpecifications"),
    Inventors = require("./models/Inventors");

const fileName = 'US20210045996A1-20210218.XML'
    filePath = path.join(__dirname, fileName),
    mainFolderPath = process.env.MAIN_FOLDER_PATH,
    extraDiskFolderPath = process.env.EXTRA_DISK_PATH;

let startDate = '2004-01-01 00:00:00', endDate = '2020-12-31 00:00:00'

const downloadFilesAndProcess = async() => {
    const startGetTime = new Date(startDate).getTime(), endGetTime = new Date(endDate).getTime()
    try{
        if (startGetTime < endGetTime) {
            const date = new Date(startDate)
            startDate = moment(date).add(1, 'week').day(4);
            const momentObject = moment(new Date(startDate))
            const folderName = `${momentObject.format('YYYYMMDD')}`
            const downloadPath = `https://bulkdata.uspto.gov/data/patent/application/redbook/${momentObject.format('YYYY')}/${folderName}.ZIP`
            console.log(`FolderName: ${startDate} - ${folderName} - ${downloadPath}`)
            const downloadFileProcess = new Promise( (resolve, reject) => {
                const downloadFileSpawn = spawn('wget', [downloadPath, '-P', `./`])
                downloadFileSpawn.stdout.on('data', (data) => {
                    console.log(`downloadFileSpawn.stdout: ${data}`)
                });
                downloadFileSpawn.stderr.on('data', (data) => {
                    console.log(`Error downloadFileSpawn.stderr: ${data}`)
                    //reject(data)
                });

                downloadFileSpawn.on('close', (code) => {
                    resolve(`download downloadFileSpawn.close ${code}`)    
                }) 
            })
            Promise.all([downloadFileProcess])
            .then(async () => {
                
                downloadFilesAndProcess()
            }).catch(function(err) {
                console.log(`Reject: ${err}`)
            });
        }
    } catch (e) {
        console.log(e)
    }
}


(async function() {
    try {
        await downloadFilesAndProcess()
        //console.log(`${extraDiskFolderPath}DOWNLOAD/`)
    } catch (e) {
      console.log('caught', e)
    }
})();