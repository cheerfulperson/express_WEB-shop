const express = require('express');
const router = express.Router();

/* GET registration listing. */
router.get('/', function(req, res, next) {
  res.render('layouts/registration');
});
router.post('/', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render('layouts/registration', {email: req.body.userEmail, password: req.body.userPassword});
})
module.exports = router;
