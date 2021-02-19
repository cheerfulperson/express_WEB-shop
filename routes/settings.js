const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  let user = req.session.user

  res.render('layouts/user-settings', {title: "Настройки профиля", profile_name: user.name})
});

module.exports = router;