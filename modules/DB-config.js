const mysql = require('mysql2');

const db_config = {
    host: "localhost",
    user: "root",
    database: "users_info",
    password: "root"
}

//Db config
const db = mysql.createPool(db_config);

module.exports = db;
