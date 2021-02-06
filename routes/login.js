const express = require('express');
const fs = require('fs');
const db = require('../moduls/DB-config');

const router = express.Router();

// get login page
router.get('/', function(req, res, next) {
    res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false});
});

router.post('/', function(req, res, next) {
    
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(user.email)
    db.query(`SELECT email, password FROM mytable WHERE (email=? and password=?)`, [user.email, user.password], function (error, results) {
        if (results.length==0){
            res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false, isNotCorectUsersData: true});
        }
        else{
            req.session.user = user.email;
            res.redirect('/');
        }
      });  
})

module.exports = router;