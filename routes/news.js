const express = require('express');

const router = express.Router();

/* GET NEWS page. */
router.get('/', function (req, res, next) {
  res.render('layouts/news', {
    title: 'NEWS',
  });
});

module.exports = router;