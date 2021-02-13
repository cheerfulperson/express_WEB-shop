const express = require('express');
const db = require('../moduls/DB-config');
const mailer = require('../moduls/nodemailer')
const jwt = require('jsonwebtoken');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

const router = express.Router();


router.get('/', function (req, res) {
    if (req.session.user != undefined) {
        let selectSQL = `SELECT email FROM mytable WHERE (email=?)`;
        let insertUserSQL = `INSERT INTO mytable(email, password, name, personalID, type_user) VALUES (?,?,?,?,?)`;
        token = req.query.personalID;
        console.log(token);
        if (token != undefined) {
            console.log(token);
            jwt.verify(token, 'qwerty', (e, decoded) => {
                if (e) {
                    console.log(e)
                } else {
                    personalID = decoded.personalID;
                    db.query(insertUserSQL, [req.session.user.email, req.session.user.password, req.session.user.name, req.session.user.personalID, req.session.user.type_user], (error, results) => {
                        if (error) console.log(error);
                        else req.session.destroy(() => {
                            res.redirect('/login');
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