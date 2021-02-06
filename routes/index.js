const express = require('express');
const fs = require('fs');
const {
  request,
  response,
  routes
} = require('../app');
const route = require('./registration');
const hbs = require('hbs');
const app = require('../app');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let categoris = ["phones", "computer", "house", "appliances", "sport", "cosmetics", "books", "eat", "for Kids", "car"];
  if(req.session.user !== undefined){
    res.render('index', {
      name: req.session.name,
      categoris: categoris,
      email: req.session.user,
      isUser: true,
    });
  }else{
    res.render('index', {
      name: req.body.name,
      categoris: categoris,
      isUser: false,
    });
  }
});




module.exports = router;