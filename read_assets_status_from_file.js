const fs = require('fs');
const JSONStream = require("JSONStream");
const es = require("event-stream");

const ApplicationStatus = require('./models/ApplicationStatus');
let YEAR = 0;
const FILE_PATH = '/mnt/volume_sfo2_12/STATUS/';
const BATCH_SIZE = 5000;

/**
 * ./node_modules/.bin/env-cmd node read_assets_status_from_file.js "2022"
 * Or with more memory: node --max-old-space-size=8192 read_assets_status_from_file.js "2022"
 */

let arrayDB = [];
let totalProcessed = 0;
let totalInserted = 0;

const streamFile = () => {
	console.log(`Reading file: ${FILE_PATH}${YEAR}.json`);
	const fileStream = fs.createReadStream(`${FILE_PATH}${YEAR}.json`);
	
	fileStream
		.pipe(JSONStream.parse("patentFileWrapperDataBag.*"))
		.pipe(
			es.through(
				async function(data) {
					try {
						this.pause();
						await processOneAsset(data, this);
					} catch(err) {
						console.log('ERROR in es.through', err);
						this.resume();
					}
					return data;
				},
				async function end() {
					console.log(`Stream reading ended - ${arrayDB.length} records`);
					
					// Insert remaining records
					if (arrayDB.length > 0) {
						console.log(`Inserting final batch of ${arrayDB.length} records...`);
						try {
							const result = await ApplicationStatus.bulkCreate(arrayDB, {ignoreDuplicates: true});
							totalInserted += result.length;
							console.log(`Final batch inserted: ${result.length} records`);
						} catch (err) {
							console.error('ERROR in final bulk insert:', err);
						}
						arrayDB = []; // Clear memory
					}
					
					console.log(`\n=== Processing Complete ===`);
					console.log(`Total processed: ${totalProcessed}`);
					console.log(`Total inserted: ${totalInserted}`);
					console.log(`===========================\n`);
					
					this.emit("end");
				}
			)
		)
		.on('error', function(error) {
			console.log('ERROR in FILE', error);
		});
};

const processOneAsset = async (data, es) => {
	try {
		totalProcessed++;
		
		// Progress indicator every 10000 records
		if (totalProcessed % 10000 === 0) {
			console.log(`Processed: ${totalProcessed} records, Inserted: ${totalInserted} records`);
		}
		
		const assetStatus = {
			appno_doc_num: data?.applicationNumberText,
			status: data?.applicationMetaData?.applicationStatusDescriptionText,
			status_date: data?.applicationMetaData?.applicationStatusDate
		};
		
		if (assetStatus.appno_doc_num != undefined && assetStatus.status != undefined && assetStatus.status_date != undefined) {
			arrayDB.push(assetStatus);
			
			if (arrayDB.length >= BATCH_SIZE) {
				try {
					const result = await ApplicationStatus.bulkCreate(arrayDB, {ignoreDuplicates: true});
					totalInserted += result.length;
					console.log(`Batch inserted: ${result.length} records (Total: ${totalInserted})`);
					arrayDB = []; // Clear the array to free memory
				} catch (err) {
					console.error('ERROR in bulk insert:', err);
					arrayDB = []; // Clear anyway to prevent memory issues
				}
			}
			es.resume();
		} else {
			if (totalProcessed % 1000 === 0) {
				console.log('Status or status_date undefined - skipping');
			}
			es.resume();
		}
	} catch (err) {
		console.log('ERROR in processOneAsset:', err);
		es.resume();
	}
};

// Main execution
const argumentSlice = process.argv.slice(2);
YEAR = argumentSlice[0];

if (!YEAR) {
	console.error('ERROR: Year argument is required');
	console.log('Usage: node read_assets_status_from_file.js YEAR');
	console.log('Example: node read_assets_status_from_file.js 2025');
	process.exit(1);
}

console.log(`Starting to process year: ${YEAR}`);
streamFile();