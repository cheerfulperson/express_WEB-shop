const express = require('express');
const db = require('../modules/DB-config');
const fs = require('fs');

const router = express.Router();

/* GET stats page for admin. */
router.get('/', function (req, res, next) {
  let categories = fs.readFileSync('./categories.json', "utf-8");
  categories = JSON.parse(categories);
  sql = `SELECT COUNT(personalID) as counter_user FROM mytable`
  db.query(sql, (err, resultsDb) => {
    res.render('layouts/site-settings', {
      title: "Настрока сайта",
      counter_user: resultsDb[0].counter_user,
      isVisiableMainBlock: false,
      categories: categories
    })
  })
});


module.exports = router;