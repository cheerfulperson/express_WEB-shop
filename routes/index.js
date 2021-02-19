const express = require('express');

const route = require('./registration');
const hbs = require('hbs');
const app = require('../app');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let categoris = ["Телефоны и аксессуары", "Компьютеры", "Электроника", "Одежда", "Для детей", "Автотовары", "Спорт и развлечения", "Красота и здоровье", "Зоотовары", "Бижутерия и часы"];

  res.render('layouts/home', {
    title: 'GENERAL PAGE',
    categoris: categoris,
  })
});




module.exports = router;