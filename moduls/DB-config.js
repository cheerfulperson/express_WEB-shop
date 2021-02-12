const bodyParser = require('body-parser');
const mysql = require('mysql2');

//Db config
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users_info",
    password: "f4a12345Z"
});

db.connect((err) =>{
    if(err) {
        console.error(err);
    }
})
module.exports = db;