const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const resourcesRaw = new Sequelize(process.env.DATABASE_RAW, process.env.USER, process.env.PASSWORD, {
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

const application = new Sequelize('db_new_application', 'db_user_all', 'wDv%5tgn0O0kMkMN', {
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


const applicationBibliograhic = new Sequelize('db_patent_grant_bibliographic', 'db_user_all', 'wDv%5tgn0O0kMkMN', {
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

const applicationGrant = new Sequelize('db_patent_application_bibliographic', 'db_user_all', 'wDv%5tgn0O0kMkMN', {
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

const applicationPED = new Sequelize('db_patent_examiner_data', 'db_user_all', 'wDv%5tgn0O0kMkMN', {
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


const inventorDB = new Sequelize('db_inventor', 'db_user_inventor', 'wDv%5tgn0O0kMkMN', {
  host: '165.232.146.68',
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

const db = { Sequelize, Op, resourcesRaw, resources, inventorDB, bucketConfig, application, applicationGrant, applicationBibliograhic, applicationPED }

module.exports = db;
