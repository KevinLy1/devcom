require('dotenv').config();
const mariadb = require('mariadb');

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

let pool;

try {
  pool = mariadb.createPool(options);
} catch (error) {
  console.error("Une erreur s'est produite pendant la connexion à la base de données", error);
}

module.exports = pool;
