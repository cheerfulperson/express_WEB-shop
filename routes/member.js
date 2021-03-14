const express = require('express');
const db = require('../modules/DB-config');

const router = express.Router();

/* GET member page. + Не зайдет если нет админки*/
router.get('/', function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    let selectSQL = `SELECT *, from_unixtime(reg_time,'%M-%d-%Y %H:%i:%s') as human_date FROM mytable`;
    db.query(selectSQL, function (err, results) {
        if (err) return res.render('error');
        res.render("layouts/member", {
            memberList: results,
            title: 'member',
            isVisiableMainBlock: false,
        });
    });
})

router.post('/information-about-user', function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    let psID = req.body.personalID;
    let selectSQL = `SELECT * from mytable where personalID=?`;
    db.query(selectSQL, psID, function (err, results) {
        if (err) return res.render('error');
        console.log(results[0].role)
        res.send({
            name: results[0].name,
            role: results[0].role,
        })

    })
})

module.exports = router;