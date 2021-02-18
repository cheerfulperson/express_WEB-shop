const express = require('express');
const db = require('../moduls/DB-config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailer = require('../moduls/nodemailer');
const bcrypt = require('bcrypt'); // Хеширование данных
 
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
  // db.connect();
  // Капча
  const capcha = req.body['g-recaptcha-response'];
  if (!req.body) {
    return res.sendStatus(400);
  }

  let user = { // ВВеденные данные юзера
    name: req.body.name, // Name юзера
    email: req.body.email, // email юзера
    password: req.body.password, // password юзера захешированный
    personalID: crypto.randomBytes(4).toString('hex'), //Зашифрованный personalID Удалить
  }

  let selectSQL = `SELECT email FROM mytable WHERE (email=?)`;
  let hbsOptionsObject = {
    isBottonHeader: false, // 
    isEmailsReapet: true, // Если повторяется email
    isVisiableMainBlock: false, // Главный блок был виден (белый)
    
  };

  //Проверка на схожесть паролей и на ввод капчи
  if (user.password == req.body.passwordRepeat && user.password.length >= 6) {
    // Проверка на существование E-mail
    user.password = bcrypt.hashSync(req.body.password, 7)
    db.query(selectSQL, [user.email], function (error, results) {
      if (error) console.log(error);
      // Если есть 
      if (results.length === 0) {
        async function delete_session() { // Удаление созданной сессии через час
          await new Promise((resolve, reject) => setTimeout(resolve, 3600 * 1000));
          await req.session.destroy(() => {})
        }
        //Вызов функции
        

        
        // создание Даты
        var date = new Date();
        var mail = {
          "personalID": user.personalID,
          "created": date.toString()
        }
        //Токен
        const token_mail_verification = jwt.sign(mail, 'qwerty', {
          expiresIn: '1h'
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
        
        user.status = 'not_verify'
        req.session.info = user; // Создае
        delete_session()

        if (error) console.log(error);
        else res.render("layouts/verify",{isVisiableMainBlock: false}); // Временно
        // Добавить пользователя. С*ка вот здесь он не работает, а теперь работает
      }else {
        res.render('layouts/registration', hbsOptionsObject);
      }
    });
  } else if(capcha =='') {
    hbsOptionsObject.isEmailsReapet = false;
    hbsOptionsObject.isNotCorectCapture= true;
    res.render('layouts/registration', hbsOptionsObject);
  }
  
  
  else {
    hbsOptionsObject.isEmailsReapet = false;
    res.render('layouts/registration', hbsOptionsObject);
  }
})
module.exports = router;