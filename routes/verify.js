const express = require('express');
const db = require('../modules/DB-config');
const jwt = require('jsonwebtoken');

const router = express.Router();
// Хуй
router.get('/', function (req, res) {
    if (req.session.info != undefined) {
        let insertUserSQL = `INSERT INTO mytable(reg_time, email, password, name, personalID) VALUES (?,?,?,?,?)`;
        token = req.query.personalID;
        console.log(token);
        if (token != undefined) {
            console.log(token);
            jwt.verify(token, 'qwerty', (e, decoded) => {
                if (e) {
                    console.log(e)
                } else {
                    personalID = decoded.personalID;
                    time = new Date() / 1000;
                    db.query(insertUserSQL, [time, req.session.info.email, req.session.info.password, req.session.info.name, req.session.info.personalID], (error, results) => {
                        if (error) console.log(error);
                        else req.session.destroy(() => {
                            res.redirect('/login');
                            console.log(results)
                        });
                    });
                }
            })
        }
    }
    else{
        res.render('error')
    }
})

module.exports = router;