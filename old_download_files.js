const fs = require('fs'),
    moment = require('moment'),
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
    mainFolderPath = process.env.MAIN_FOLDER_PATH,
    extraDiskFolderPath = process.env.EXTRA_DISK_PATH;

    let startDate = '2020-10-29 00:00:00', endDate = '2020-12-31 00:00:00'

const downloadFilesAndProcess = async() => {
    const startGetTime = new Date(startDate).getTime(), endGetTime = new Date(endDate).getTime()
    try{
        if (startGetTime < endGetTime) {
            const date = new Date(startDate)
            startDate = moment(date).add(1, 'week').day(4);
            const momentObject = moment(new Date(startDate))
            const folderName = `I${momentObject.format('YYYYMMDD')}`
            const downloadPath = `https://bulkdata.uspto.gov/data/patent/application/redbook/${momentObject.format('YYYY')}/${folderName}.tar`
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
                console.log(`Reject : ${err}`)
            });
        }
    } catch (e) {
        console.log(e)
    }
}
 

const downloadFilesFromArray = (index) => {
/*    const filesArray = ["https://bulkdata.uspto.gov/data/patent/application/redbook/2002/20020523.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2002/20020718.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030102.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030109.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030116.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030123.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030130.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030206.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030213.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030220.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030227.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030206.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030227.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030403.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030417.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030508.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030515.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030522.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030529.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030605.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030612.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030619.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030626.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030703.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030710.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030717.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030724.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030731.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030807.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030814.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030828.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030904A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030904B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030911.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030918.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030925A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20030925B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031002.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031009.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031016.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031023.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031030.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031106A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031106B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031113.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031120.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031127.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031211.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031218.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2003/20031225.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2004/20040101.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2004/20041230.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2006/I20060105.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070104.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070111.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070118.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070125.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070201.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070208.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070215.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070301.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070308.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070315.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070322.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070329.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070405.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070412.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070419.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070426.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070503.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070510.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070517.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070524.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070531.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070607.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070614.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070621.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070712.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070719.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070726.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070802.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070809.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070816.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070823.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070830.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070906.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070913.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070920.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20070927.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071004.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071011.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071018.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071025.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071101.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071108.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071115.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071122.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071129.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071206.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2007/I20071213.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2008/I20081002A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2008/I20081002B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20090305A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20090305B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20090521A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20090521B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20090618A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20090618B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091001A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091001B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091203A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091203B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091210A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091210B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091231A.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2009/I20091231B.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100107.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100114.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100121.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100128.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100218.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100311.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100325.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100401.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100408.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100422.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100429.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100520.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100527.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100708.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100715.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100722.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100812.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100819.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100826.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100902.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100909.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20100923.ZIP",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101007.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101014.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101021.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101104.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101111.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101118.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101125.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101202.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101209.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101216.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101223.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2010/I20101230.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2014/I20140918.tar.001",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2014/I20140918.tar.002",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2014/I20140918.tar.003",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2014/I20140918.tar.004",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2014/I20140918.tar.005",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2014/I20140918.tar.006",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2019/I20190801_r1.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2019/I20190808_r1.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2019/I20190815_r1.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2019/I20190815_r2.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2019/I20190822_r1.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2019/I20190822_r2.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2020/I20200319.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2020/I20201022.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2021/I20210114.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2021/I20210506.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2021/I20210812.tar",
"https://bulkdata.uspto.gov/data/patent/application/redbook/2021/I20210909.tar"]*/
/*
  const filesArray = [ "https://bulkdata.uspto.gov/data/patent/assignment/ad20210111.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210112.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210113.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210114.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210115.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210118.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210119.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210120.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210121.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210122.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210125.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210126.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210127.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210128.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210129.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210201.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210202.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210203.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210204.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210205.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210208.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210209.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210210.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210211.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210212.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210215.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210216.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210217.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210218.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210219.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210222.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210223.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210224.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210225.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210226.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210301.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210302.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210303.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210304.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210305.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210308.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210309.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210310.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210311.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210312.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210315.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210316.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210317.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210318.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210319.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210322.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210323.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210324.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210325.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210326.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210329.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210330.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210331.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210401.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210402.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210405.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210406.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210407.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210408.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210409.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210412.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210413.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210414.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210415.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210416.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210419.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210420.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210421.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210422.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210423.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210426.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210427.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210428.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210429.zip",
  "https://bulkdata.uspto.gov/data/patent/assignment/ad20210430.zip"]*/
const filesArray = ["https://bulkdata.uspto.gov/data/patent/grant/redbook/2006/US06992961-20060131.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2006/US07000000-20060214.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2006/US07074349-20060711.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2006/US07088061-20060808.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2006/US07152295-20061226.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2007/US07228197-20070605.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/US07361191-20080422.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/US07400107-20080715.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/US07401097-20080715.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/USPP019399-20081104.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/USPP019407-20081104.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/USPP019424-20081104.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/USPP019532-20081202.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/USPP019533-20081202.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2008/USPP019538-20081202.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07645036-20100112.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07662308-20100216.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07741380-20100622.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07776145-20100817.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07787329-20100831.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07809235-20101005.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07816422-20101019.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07825168-20101102.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07828891-20101109.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07847791-20101207.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2010/US07854796-20101221.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US07862163-20110104.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US07891765-20110222.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US07919545-20110405.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US07935742-20110503.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US08011774-20110906.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US08039542-20111018.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US08061830-20111122.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US08070868-20111206.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/US08076393-20111213.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2011/USRE042029-20110118.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08114208-20120214.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08158746-20120417.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08174074-20120508.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277550-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277681-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277695-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277698-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277700-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277787-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277824-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277865-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277894-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277909-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277914-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08277972-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278234-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278258-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278283-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278289-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278301-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278311-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278316-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278319-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278326-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278328-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278334-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278336-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278339-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278345-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278350-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278374-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278376-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278382-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278396-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278398-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278426-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278445-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278451-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278453-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278463-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278467-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278476-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278480-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278488-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278502-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08278535-20121002.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08283361-20121009.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2012/US08309694-20121113.zip",
"https://bulkdata.uspto.gov/data/patent/grant/redbook/2020/I20200317_r1.tar"]

	const downloadFileProcess = new Promise( (resolve, reject) => {
        const downloadFileSpawn = spawn('wget', [filesArray[index].trim(), '-P', `/var/www/html/volume1/patent/`])
        downloadFileSpawn.stdout.on('data', (data) => {
            console.log(`downloadFilesFromArray.stdout: ${data}`)
        });
        downloadFileSpawn.stderr.on('data', (data) => {
            console.log(`Error downloadFilesFromArray.stderr: ${data}`)
            //reject(data)
        });

        downloadFileSpawn.on('close', (code) => {
            resolve(`download downloadFilesFromArray.close ${code}`)    
        }) 
    })
    Promise.all([downloadFileProcess])
    .then(async () => {
        const nextIndex = index + 1
        if(nextIndex < filesArray.length) {
            downloadFilesFromArray(nextIndex)
        }        
    }).catch(function(err) {
        console.log(`Reject: ${err}`)
    }); 
}


(async function() {
    try {
        downloadFilesFromArray(0)
        //await downloadFilesAndProcess()
        //console.log(`${extraDiskFolderPath}DOWNLOAD/`)
    } catch (e) {
      console.log('caught', e)
    }
})();
