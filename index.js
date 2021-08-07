const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser');

const { exec, spawn  } = require('child_process');
const { decode } = require('html-entities');

const ApplicationDetails = require("./models/ApplicationDetails"),
    ApplicationClaims = require("./models/ApplicationClaims"),
    ApplicationFigures = require("./models/ApplicationFigures"),
    ApplicationSpecifications = require("./models/ApplicationSpecifications"),
    Inventors = require("./models/Inventors");

const fileName = 'US20210045996A1-20210218.XML'
    filePath = path.join(__dirname, fileName),
    mainFolderPath = '/var/www/html/trash/patent_application_bibliographic/';

const folderName = 'I20210204'
/*
exec(`wget https://bulkdata.uspto.gov/data/patent/application/redbook/2021/${folderName}.tar -P ${mainFolderPath}DOWNLOAD/` , (err, stdout, stderr) => {
    if( !err ) {
        
    }
})*/

console.log(`tar -xvf ${mainFolderPath}DOWNLOAD/${folderName}.tar`)
const option = {maxBuffer: 1024 * 1024}
const spawnOptions = {
    stdio: [
        'inherit', // StdIn.
        'pipe',    // StdOut.
        'pipe'     // StdErr.
    ],
};
const folderList = [`/var/www/html/trash/patent_application_bibliographic/DOWNLOAD/I20210204`, `/var/www/html/trash/patent_application_bibliographic/DOWNLOAD/I20210204-SUPP`]

const child = spawn('find', [folderList[0], '-type', 'd', '-name', 'UTIL*']);
child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
});




  