const express = require('express');
const fs = require('fs');
const hbs = require('handlebars');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let categories = fs.readFileSync('./jsonPatterns/categories.json', "utf-8");
  categories = JSON.parse(categories);
  hbs.registerHelper('categories', (block) => {
    block.data.root.categories = categories;
  })
  res.render('layouts/home', {
    title: 'Главная страница',
    isVisibleCategories: true,
    isAdvertisingPosterVisible: true,
    isVisibleCatalog: true
  })
});
router.post('/categories', function (req, res, next) {
  let categories = fs.readFileSync('./jsonPatterns/categories.json', "utf-8");
  res.send(categories);
});




module.exports = router;