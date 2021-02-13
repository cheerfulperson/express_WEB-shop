const express = require('express');
const db = require('../moduls/DB-config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailer = require('../moduls/nodemailer');

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

  let user = { // ВВеденные данные юзера
    name: req.body.name, // Name юзера
    email: user.email, // email юзера
    password: user.password, // password юзера
    //Зашифрованный personalID
    personalID: crypto.randomBytes(4).toString('hex'), // удалить
    type_user: 0,
    status: 'register',
  }

  let selectSQL = `SELECT email FROM mytable WHERE (email=?)`;
  let insertUserSQL = `INSERT INTO mytable(email, password, name, personalID, type_user) VALUES (?,?,?,?,?)`;
  let hbsOptionsObject = {
    isBottonHeader: false, // 
    isEmailsReapet: true, // Если повторяется email
    isVisiableMainBlock: false, // Главный блок был виден (белый)
  };

  //Проверка на схожесть паролей
  if (user.password == req.body.passwordRepeat && user.password.length >= 6) {
    // Проверка 
    db.query(selectSQL, [user.email], function (error, results) {
      if (error) console.log(error);
      if (results.length === 0) {
        async function delete_session() {
         await new Promise((resolve, reject) => setTimeout(resolve, 15*60*1000));
         await req.session.destroy(() => {
        })
         console.log(req.session)
        }
        //Вызов функции
        delete_session()

        req.session.user = user;
        // создание Даты
        var date = new Date();
        var mail = {
          "personalID": user.personalID,
          "created": date.toString()
        }
        //Токен
        const token_mail_verification = jwt.sign(mail, 'qwerty', {
          expiresIn: '900'
        });
        //Собираем URL подтверждения
        var url = "http://127.0.0.1:3000/" + "verify?personalID=" + token_mail_verification;
        // Отправка сообщения по почте

        const message = {
          to: user.email, // list of receivers
          subject: "Подтверждение аккаунта", // Subject line
          html: "Привет,<br> Нажмите на ссылку.<br><a href=" + url + ">Подтвердить почту</a>",
        }
        //Вызов функции mailer
        mailer(message);


        if (error) console.log(error);
        else res.send('Письмо с подтверждением акаунта было отправлено вам на почту'); // Временно

        // Добавить пользователя. С*ка вот здесь он не работает, а теперь работает
        // db.query(insertUserSQL, [user.email, user.password, user.name, user.personalID, user.type_user], (error, results) => {
        //   if (error) console.log(error);
        //   else res.redirect('/login');
        // });

      } else {
        res.render('layouts/registration', hbsOptionsObject);
      }
    });
  } else {
    hbsOptionsObject.isEmailsReapet = false;
    res.render('layouts/registration', hbsOptionsObject);
  }
})
module.exports = router;