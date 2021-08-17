const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const resources = new Sequelize('db_patent_application_bibliographic_new', 'db_user_all', 'wDv%5tgn0O0kMkMN', {
    host: '167.172.195.92',
    dialect: 'mysql',
    operatorsAliases: Op,
   /*
    pool: {
      max: 1000,
      min: 0,
      acquire: 1000000,
      idle: 10000
    }*/
});


const inventorDB = new Sequelize('db_inventor', 'inventor_user', '!Q2w3e4r', {
  host: '147.182.255.135',
  dialect: 'mysql',
  operatorsAliases: Op,
 /*
  pool: {
    max: 1000,
    min: 0,
    acquire: 1000000,
    idle: 10000
  }*/
});

console.log(inventorDB)

const bucketConfig = {
    bucketName: process.env.BUCKET_NAME,
    dirName: process.env.BUCKET_PHOTO_DIR, /* optional */
    region: process.env.BUCKET_REGION,
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    s3Url: process.env.BUCKET_URL, /* optional */
    documentDir: process.env.BUCKET_DOCUMENT_DIR,
    figuresDir: process.env.BUCKET_FIGURES_DIR,
  }

const db = { Sequelize, Op, resources, inventorDB, bucketConfig }

module.exports = db;