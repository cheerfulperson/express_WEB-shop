const express = require('express');
const db = require('../moduls/DB-config');

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
// // Тут остановился
// router.get('/:id', function (req, res, next) {
//     if (!req.body) return res.sendStatus(400);
//     let selectSQL = `SELECT *, from_unixtime(reg_time,'%M-%d-%Y %H:%i:%s') as human_log From user_info`;
//     db.query(selectSQL, function (err, results) {
//         if (err) return console.log('Ошибка')
//         res.render("layouts/member_account", {
            
//             member_acc: results,
//             title: 'member',
//             isVisiableMainBlock: false,
//         });
//         console.log(results)
//     });
// })

module.exports = router;