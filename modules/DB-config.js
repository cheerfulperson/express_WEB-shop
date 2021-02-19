const mysql = require('mysql2');

const db_config = {
    host: "localhost",
    user: "root",
    database: "users_info",
    password: "f4a12345Z"
}

//Db config
const db = mysql.createPool(db_config);

module.exports = db;
