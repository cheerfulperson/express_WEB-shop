const express = require('express');
const db = require('../modules/DB-config');
const jwt = require('jsonwebtoken');

const router = express.Router();
// Хуй
router.get('/', function (req, res) {
    if (req.session.info != undefined) {
        let insertUserSQL = `INSERT INTO mytable(reg_time, email, password, name, personalID, photo) VALUES (?,?,?,?,?,?)`;
        let photo =  "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png"; // Фото по дефолду
        token = req.query.personalID;
        if (token != undefined) {
            jwt.verify(token, 'qwerty', (e, decoded) => {
                if (e) {
                    console.log(e)
                } else {
                    personalID = decoded.personalID;
                    time = new Date() / 1000;
                    db.query(insertUserSQL, [time, req.session.info.email, req.session.info.password, req.session.info.name, req.session.info.personalID, photo], (error, results) => {
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