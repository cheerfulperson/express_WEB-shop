const express = require('express');
const fs = require('fs');
const db = require('../moduls/DB-config');

const router = express.Router();

// Получение страницы login
router.get('/', function(req, res, next) {

    res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false});
});

router.post('/', function(req, res, next) {
    
    let user = {
        email: req.body.email,
        password: req.body.password,
        bascket: '',
        name: '',
        personalID: null,
        type_user: 0,
        status: 'login',
    }

    db.query(`SELECT email, password FROM mytable WHERE (email=? and password=?)`, [user.email, user.password], function (error, results) {
        if (error) console.error(error);
        if (results.length==0){
            res.render('layouts/login', {isBottonHeader: false, isVisiableMainBlock: false, isNotCorectUsersData: true});
        }
        else{
            // Ищем данного пользователя
            db.query(`SELECT * FROM mytable WHERE (email='${user.email}' and password='${user.password}')`, (error, results) => {
                // Добавляем пользователя в сессию
                // ????????????????? Пароль я не шифровал и не обязательно его вообще в сессию добавлять???????????????????  - ответ:Не надо
                user.name = results[0].name;
                user.personalID = results[0].personalID;
                user.type_user = results[0].type_user;
                req.session.user = user;
                res.redirect('/');
                console.log(req.session);
            })
        }
      });  
})

module.exports = router;