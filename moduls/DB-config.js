const bodyParser = require('body-parser');
const mysql = require('mysql2');

//Db config
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "firstbd",
    password: "root"
});

db.connect((err) =>{
    if(err) {
        console.error(err);
    }
})
module.exports = db;