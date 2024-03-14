const Sequelize = require('sequelize');
require('dotenv').config();

const { JAWSDB_URL, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const isJawsDbUrlPresent = !!JAWSDB_URL;

const sequelize = new Sequelize(
  isJawsDbUrlPresent ? JAWSDB_URL : {
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
