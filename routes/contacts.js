const express = require('express');
const router = express.Router();

/* GET contacts page. */
router.get('/', function (req, res, next) {
  res.render('layouts/contacts', {
    title: 'contacts'.toUpperCase(),
  });
});



module.exports = router;