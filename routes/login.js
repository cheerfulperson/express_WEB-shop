const express = require('express');
const session = require('express-session');
const db = require('../moduls/DB-config');
const {secret} = require('../moduls/secret.js');
const bcrypt = require('bcrypt'); // Хеширование данных


const router = express.Router();

// Получение страницы login
router.get('/', function(req, res, next) {
    if (req.session.user === undefined) {
    res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false});
    }
    else{
        res.render('error');
    }
});

router.post('/', function(req, res, next) {
    const token = req.body['g-recaptcha-response']
    let user = {
        email: req.body.email,
        password: req.body.password, 
        bascket: '',
        name: '',
        personalID: null,
        status: 'login',
    }
    // Ищем такого пользователя
    db.query(`SELECT * FROM mytable WHERE email=?`, [user.email], function (error, results) {
        if (results.length==0){ // Не находим
            res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false, isNotCorectUsersData: true});
        } else{ // Находим
            const validPassword = bcrypt.compareSync(user.password, results[0].password) // Расшифрока пароля. bool
            console.log(token)
            if (validPassword && token != ""){ // Добавить капчу
             
            user.name = results[0].name;
            user.personalID = results[0].personalID;
            user.role_user = results[0].role;
            req.session.user = user;
            res.redirect('/');
            }
            else if(token == ''){
                console.log(token)
                res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false, isNotCorectUsersData: false, isNotCorectCapture: true});
            }

            else{
                
                res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false, isNotCorectUsersData: true});
            }  
        } 
      });  
})

module.exports = router;