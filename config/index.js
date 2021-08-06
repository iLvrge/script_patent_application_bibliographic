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

const db = { Sequelize, Op, resources }

module.exports = db;