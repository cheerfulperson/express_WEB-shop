const express = require('express');
const db = require('../modules/DB-config');
const fs = require('fs');
const Pat = require('../modules/productsPatterns');
const createError = require('http-errors');
 
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
  let categories = fs.readFileSync('./jsonPatterns/categories.json', "utf-8");
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

router.route('/production/addition-product')
.get((req, res, next) => {
  let categories = JSON.parse(fs.readFileSync('./jsonPatterns/categories.json', "utf-8"));
    res.render('layouts/site-settings/additionProd', {
      title: "Настрока сайта",
      categories: categories,
      isVisibleSubMenu: true
    })
})
.post((req, res, next) => {
  console.log(req.body)
  res.redirect('/site-settings/production/addition-product');
});
router.route('/production/addition-product/:content')
.get((req, res, next) => {
  let content = req.params['content'].split('-').join(''); // Название категории
  let newPat = new Pat(content);
  if (newPat.patterns.patternForCompare != undefined) {
    newPat.description = newPat.patterns.patternForCompare;
    console.log(newPat.join())
    res.send(JSON.stringify(newPat.patterns));
  }else {
    res.send(createError(404));
  }
})
module.exports = router;