const fs = require('fs'),
        JSONStream = require("JSONStream"),
        es = require("event-stream");

const ApplicationStatus = require('./models/ApplicationStatus')
let YEAR = 0;
const FILE_PATH = '/mnt/volume_sfo2_12/STATUS/'

/**
 * ./node_modules/.bin/env-cmd node read_assets_status_from_file.js "2022"
 */
let arrayDB = []
const streamFile = () => {
	console.log(`${FILE_PATH}${YEAR}.json`);
	fileStream = fs.createReadStream(`${FILE_PATH}${YEAR}.json`);
	/* fileStream.pipe(JSONStream.parse(["PatentBulkData.*", "PatentData.*"])).pipe( */
	fileStream.pipe(JSONStream.parse("PatentBulkData.*")).pipe(
		es.through(function(data) {
			try{
				this.pause();
				processOneAsset(data, this);
			} catch(err) {
				console.log('ERROR in es.through', err)
			}			
			return data;
		}),
		function end() {
			console.log("stream reading ended");
			this.emit("end");
			console.log(arrayDB)
		}
	).on('error', function(error) {
		console.log('ERROR in FILE',error);
	}).on('end', async () => {
		console.log('FINISHHHhhhh', arrayDB.length)
		if(arrayDB.length > 0) {
			await ApplicationStatus
				.bulkCreate(arrayDB, {ignoreDuplicates: true})
		}
	})
}


const processOneAsset = async(data, es) => {
	try{
		const assetStatus = {
			appno_doc_num: data.patentCaseMetadata.applicationNumberText.value, 
			status: data.patentCaseMetadata.applicationStatusCategory,
			status_date: data.patentCaseMetadata.applicationStatusDate
		}
		if(assetStatus.status != undefined && assetStatus.status_date != undefined ) {
			arrayDB.push(assetStatus)
			if(arrayDB.length === 5000) {
				await ApplicationStatus
				.bulkCreate(arrayDB, {ignoreDuplicates: true})
				.then(function (appData) {
					console.log('DATA INSERTED', appData)
					arrayDB = []
					es.resume();
				})
			} else {
				es.resume();
			}
			
		} else {
			console.log('Status undefined')
			es.resume();
		}
	} catch (err) {
		console.log('ERROR in JSON Data', err)
		es.resume();
	}    
}

const argumentSlice = process.argv.slice(2);
YEAR = argumentSlice[0];
streamFile();
