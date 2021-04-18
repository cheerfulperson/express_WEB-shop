const express = require('express');
const db = require('../modules/DB-config');
const fs = require('fs');
const hbs = require('handlebars');

const router = express.Router();

// router.use('/', (req, res, next) => {
//   hbs.registerHelper('siteSettingsHelpers', block => {
//     block.data.root.isVisibleSubMenu = true;
//     console.log(block.data)
//   })
//   next();
// })
/* GET stats page for admin. */
router.get('/', function (req, res, next) {
  let categories = fs.readFileSync('./categories.json', "utf-8");
  categories = JSON.parse(categories);
  sql = `SELECT COUNT(personalID) as counter_user FROM mytable`
  db.query(sql, (err, resultsDb) => {
    res.render('layouts/site-settings/statistics', {
      title: "Настрока сайта",
      counter_user: resultsDb[0].counter_user,
      isVisiableMainBlock: false,
      categories: categories,
      isVisibleSubMenu: true
    })
  })
});

router.get('/categories', function (req, res, next) {
  let categories = fs.readFileSync('./categories.json', "utf-8");
  categories = JSON.parse(categories);
  sql = `SELECT COUNT(personalID) as counter_user FROM mytable`
  db.query(sql, (err, resultsDb) => {
    res.render('layouts/site-settings/set-categories', {
      title: "Настрока сайта",
      counter_user: resultsDb[0].counter_user,
      isVisiableMainBlock: false,
      categories: categories,
      isVisibleSubMenu: true
    })
  })
});


module.exports = router;