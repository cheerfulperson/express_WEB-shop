const express = require('express');
const db = require('../modules/DB-config');
const bcrypt = require('bcrypt'); // Хеширование данных

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  let user = req.session.user;
  let objSettings = {};

  db.query(`SELECT * FROM mytable WHERE personalID=?`, [user.personalID], (err, results) => {
    objSettings.sername = results[0].sername;
    objSettings.bio = results[0].bio;
    user.profileImage = results[0].photo;
    objSettings.birthday = results[0].birthday;
    objSettings.gender = results[0].gender;
    objSettings.phone1 = results[0].phone1;
    objSettings.phone2 = results[0].phone2;
    objSettings.phone3 = results[0].phone3;
    objSettings.seconedEmail = results[0].seconedEmail;

    for (let el in objSettings) {
      if (objSettings[el] == null) objSettings[el] = "";
    }
    user.profileSettings = objSettings;
    req.session.user = user;

    res.render('layouts/settings-userProfile', {
      title: "Настройки профиля",
      isVisiableMainBlock: false,
      profile_name: user.name,
      sername: user.profileSettings.sername,
      bio: user.profileSettings.bio,
      birthday: user.profileSettings.birthday,
      gender: user.profileSettings.gender,
      phone1: user.profileSettings.phone1,
      phone2: user.profileSettings.phone2,
      phone3: user.profileSettings.phone3,
      seconedEmail: user.profileSettings.seconedEmail
    })
  })
});

router.get('/registration-data',  (req, res, next) => {
  let user = req.session.user;
  res.render('layouts/settings-register', {
    title: "Регистрационный данные",
    isVisiableMainBlock: false,
    email: user.email,

  })
})

router.post('/upluad-user-image', (req, res, next) => {
  // Обновляем avatar пользователя
  req.session.user.image = req.body.src;
  res.redirect('/settings');
})
router.post('/save-settings', (req, res, next) => {
  let form = req.body;
  let user = req.session.user;

  let objSettings = {};

  if (form.name == '') {

  } else {
    // Перебор внесенных данных и если ничего не ввел, то null
    for (let element in form) {
      if (form[element] == '') form[element] = null;
    }

    // Если поменял что-то, то это в сесси меняется
    user.name = form.name;
    user.profileImage = user.image;
    delete user.image;
    objSettings.sername = form.sername;
    objSettings.bio = form.bio;
    objSettings.birthday = form.birthday;
    if (form.gender != "0" || form.gender != undefined) objSettings.gender = form.gender;
    objSettings.phone1 = form.phone1;
    objSettings.phone2 = form.phone2;
    objSettings.phone3 = form.phone3;
    objSettings.seconedEmail = form.seconedEmail;
    for (let el in objSettings) {
      if (objSettings[el] == null) objSettings[el] = "";
    }
    user.profileSettings = objSettings;

    req.session.user = user;

    let userInfo = [user.name, form.sername, form.bio, user.profileImage, form.birthday, form.gender, form.phone1, form.phone2, form.phone3, form.seconedEmail, user.personalID];
    let update = `UPDATE mytable SET name=?, sername=?, bio=?, photo=?, birthday=?, gender=?, phone1=?, phone2=?, phone3=?, seconedEmail=? WHERE personalID=?`;

    // Обновляем данные пользователя
    db.query(update, userInfo, function (error, results) {
      if (error) console.error(error);
    });
    res.redirect('/settings');
  }

})
router.post('/registration-data/change-account-password', (req, res, next) =>{
  let user = req.session.user;
  let password = req.body.oldPassword; // пароль
  let newPassword = req.body.newPassword;
  let newRptPassword = req.body.newRptPassword;

  let update = `UPDATE mytable SET password=? WHERE email=?`;

  if(newPassword == newRptPassword){
    if (newPassword.length >= 6) {
      newPassword = bcrypt.hashSync(newPassword, 7);

        // Ищем такого пользователя
      db.query(`SELECT * FROM mytable WHERE email=?`, [user.email], function (error, results) {
        // Находим
        const validPassword = bcrypt.compareSync(password, results[0].password) // Расшифрока пароля. bool 
        if (validPassword){ // Тут еще будет проверка на новый пароль
          db.query(update, [newPassword, user.email], (err, results) => {if(err)console.error(err)}); // Меняем пароль
          
          res.send({isInvalidPassword: false}); //Отправка на клиентский js cм. index.js
        }else{     
          res.send({isInvalidPassword: true}); //Отправка на клиентский js
        }        
      });  
    }else{

    }
  }else{

  }
})
router.delete('/registration-data/delete-account', (req, res, next) => {
  let user = req.session.user;
  let password = req.body.password; // пароль

  // Ищем такого пользователя
  db.query(`SELECT * FROM mytable WHERE email=?`, [user.email], function (error, results) {
          // Находим
          const validPassword = bcrypt.compareSync(password, results[0].password) // Расшифрока пароля. bool
  
          if (validPassword ){ 
          // Удаляет аккаунт
          db.query(`DELETE FROM mytable WHERE email=?`, [user.email], (error, results) => {
            if(error) console.error(error);
            req.session.destroy((err) => { //
              if (err) console.error(err);
              res.send({isInvalidPassword: false}); //Отправка на клиентский js cм. modal_user.js
            });
          })


          }else{     
              res.send({isInvalidPassword: true}); //Отправка на клиентский js
          }  
       
    });  


})

module.exports = router;