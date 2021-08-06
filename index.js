const fs = require('fs'),
    path = require('path'),    
    parser = require('fast-xml-parser');

const { exec } = require('child_process');
const { decode } = require('html-entities');

const ApplicationDetails = require("./models/ApplicationDetails"),
    ApplicationClaims = require("./models/ApplicationClaims"),
    ApplicationFigures = require("./models/ApplicationFigures"),
    ApplicationSpecifications = require("./models/ApplicationSpecifications"),
    Inventors = require("./models/Inventors");

const fileName = 'US20210045996A1-20210218.XML'
    filePath = path.join(__dirname, fileName);

const folderName = 'I20210218'

exec(`find /var/www/html/trash/patent_application_bibliographic/${folderName} -type d  -name "UTIL*"`, (err, stdout, stderr) => {
    if(!err) {
        console.log('FOLDER NAME', stdout)
    } else {
        console.log('Error', err)
    }
})