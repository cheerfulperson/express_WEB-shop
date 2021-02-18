const express = require('express');
const db = require('../moduls/DB-config');

const router = express.Router();

/* GET stats page for admin. */
router.get('/', function (req, res, next) {
    total_users(req.body,res)
  });

 let total_users = (data,res)=>{
    //Всего пользователей
    sql = `SELECT COUNT(personalID) as counter_user FROM mytable`
    db.query(sql, (err,resultsDb)=>{
      res.render('layouts/stats',{counter_user: resultsDb[0].counter_user, isVisiableMainBlock: false})
    })
  }
module.exports = router;
