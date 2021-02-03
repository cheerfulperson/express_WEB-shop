// Конфиг bd
const mysql = require('mysql2');

module.exports = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "firstbd",
    password: "root"
  });