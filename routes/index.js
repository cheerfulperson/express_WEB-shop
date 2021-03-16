const express = require('express');
const fs = require('fs');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let categories = fs.readFileSync('./categories.json', "utf-8");
  categories = JSON.parse(categories);

  res.render('layouts/home', {
    title: 'GENERAL PAGE',
    categories: categories,

  })
});
router.post('/categories', function (req, res, next) {
  let categories = fs.readFileSync('./categories.json', "utf-8");
  res.send(categories);
});




module.exports = router;