const express = require('express');
const db = require('../modules/DB-config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailer = require('../modules/nodemailer');
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

  if (!req.body) return res.sendStatus(400);
  // Капча
  const capcha = req.body['g-recaptcha-response'];
  let selectSQL = `SELECT email FROM mytable WHERE (email=?)`;
  let hbsOptionsObject = {
    isBottonHeader: false, // 
    isEmailsReapet: false, // Если повторяется email
    isVisiableMainBlock: false, // Главный блок был виден (белый)
    errorMessage: '' // Если возникает какая-то ошибка введенных данных
  };
  
  if (req.body.termsAndPrivacy == 'on') { // Проверка на согласия пользователя с политикой и приватным соглашением
    let user = { // ВВеденные данные юзера
      name: req.body.name, // Name юзера
      email: req.body.email, // email юзера
      password: req.body.password, // password юзера захешированный
      personalID: crypto.randomBytes(4).toString('hex'), //Зашифрованный personalID 
      notifications: !req.body.notifications ? "on" : null, // Уведомления пользователя
    }

    //Проверка на схожесть паролей и на ввод капчи
    if (user.password == req.body.passwordRepeat) {
      if (user.password.length >= 6) {
        // Проверка на существование E-mail
        user.password = bcrypt.hashSync(req.body.password, 7);
        db.query(selectSQL, [user.email], function (error, results) {
          if (error) console.log(error);
          // Если есть 
          if (results.length === 0) {
            async function delete_session() { // Удаление созданной сессии через час
              await new Promise((resolve, reject) => setTimeout(resolve, 3600 * 1000));
              await req.session.destroy(() => {})
            }

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

            var url = "http://127.0.0.1:3000/" + "verify?personalID=" + token_mail_verification; //Собираем URL подтверждения
            // Отправка сообщения по почте
            const message = {
              to: user.email, // list of receivers
              subject: "Подтверждение аккаунта", // Subject line
              html: "Привет,<br> Нажмите на ссылку.<br><a href=" + url + ">Подтвердить почту</a>",
            }
            //Вызов функции mailer
            // mailer(message); пока остановил

            user.status = 'not_verify'
            req.session.info = user; // Создает
            delete_session()

            if (error) console.log(error);
            else res.render("layouts/verify", {
              isVisiableMainBlock: false
            }); // Временно
            // Добавить пользователя. С*ка вот здесь он не работает, а теперь работает 
          } else {
            hbsOptionsObject.isEmailsReapet = true;
            res.render('layouts/registration', hbsOptionsObject);
          }
        });
      }else{// Выводит ошибку с если пароль менее 6
        hbsOptionsObject.errorMessage = 'Длинна меньше 6 символов';
        res.render('layouts/registration', hbsOptionsObject);
      }

    } else if (capcha == '') { // Если капча не пройдена
      hbsOptionsObject.isNotCorectCapture = true;
      res.render('layouts/registration', hbsOptionsObject);
    } else { // если пароли не совпадают
      hbsOptionsObject.errorMessage = 'Пароли не совпадают';
      res.render('layouts/registration', hbsOptionsObject);
    }
  } else {
    hbsOptionsObject.errorMessage = 'Вы не согласились с правилами пользования';
    res.render('layouts/registration', hbsOptionsObject);
  }

})
module.exports = router;