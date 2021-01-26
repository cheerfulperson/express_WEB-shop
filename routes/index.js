const express = require('express');
const fs = require('fs');
const { request, response } = require('../app');
const router = express.Router();

/* GET home page. */
router.use(function(req, res, next){  
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let data = `${hour}:${minutes}:${seconds} ${req.method} ip: ${req.ip} ${req.get("user-agent")}`;
  console.log(data);
  fs.appendFile("server.log", data + "\n", function(){});
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
