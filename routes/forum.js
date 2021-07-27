const express = require('express');
const router = express.Router();

/* GET forum page. */
router.get('/', function (req, res, next) {
  res.render('layouts/forum', {
    title: 'forum'.toUpperCase(),
  });
});

module.exports = router;