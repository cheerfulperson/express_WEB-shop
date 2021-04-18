const mysql = require('mysql2');

const db_config = {
    host: "localhost",
    user: "root",
    database: "categories_and_products",
    password: "f4a12345Z"
}

//Db config
const db = mysql.createPool(db_config);

module.exports = db;