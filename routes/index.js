const express = require('express');
const fs = require('fs');
const {
  request,
  response
} = require('../app');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'GENERAL PAGE',
  });
});



module.exports = router;