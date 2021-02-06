const express = require('express');
const db = require('../moduls/DB-config');
const crypto = require('crypto');

const router = express.Router();

/* GET registration listing. */
router.get('/', function (req, res, next) {
  res.render('layouts/registration', {
    isBottonHeader: false,
    isEmailsReapet: false,
    isNameReapet: false,
    isVisiableMainBlock: false,
    isPasswordRepeat: false,
  });
});

router.post('/', function (req, res, next) {
  db.connect();
  if (!req.body) {

    return res.sendStatus(400);

  }

  let user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    //Зашифрованный personalID
    personalID: crypto.randomBytes(4).toString('hex'),
    type_user: 0
  }

  let selectSQL = `SELECT email FROM mytable WHERE (email=?)`;
  let insertUserSQL = `INSERT INTO mytable(email, password, name, personalID, type_user) VALUES (?,?,?,?,?)`;
  let hbsOptionsObject = {
    isBottonHeader: false,
    isEmailsReapet: true,
    isVisiableMainBlock: false,
    isPasswordUnRepeat: false,
    name: req.body.name,
    email: user.email,
    password: user.password,
    pwsReapet: req.body.passwordRepeat
  };

  //Проверка на схожесть паролей
  if (user.password == req.body.passwordRepeat && user.password.length >= 6) {
    // Проверка 
    db.query(selectSQL, [user.email, user.name], function (error, results) {
      if (error) console.log(error);
      if (results.length === 0) {


          db.query(insertUserSQL, [user.email, user.password, user.name, user.personalID, user.type_user], (error, results) => {
            if (error) console.log(error);
            else res.redirect('/login');
          });

        // Добавить пользователя. С*ка вот здесь он не работает, а теперь работает

      } else {
        res.render('layouts/registration', hbsOptionsObject);
      }
    });
  } else {
    hbsOptionsObject.isPasswordUnRepeat = true;
    hbsOptionsObject.isEmailsReapet = false;
    hbsOptionsObject.pwsReapet = '';
    res.render('layouts/registration', hbsOptionsObject);
  }
})
module.exports = router;