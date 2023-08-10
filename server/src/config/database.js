require('dotenv').config();
const mariadb = require('mariadb');

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

const pool = mariadb.createPool(options);

module.exports = pool;
