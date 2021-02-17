const bodyParser = require('body-parser');
const mysql = require('mysql2');

//Db config
const db = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "firstbd",
    password: "root",
});

module.exports = db;