const router = require('express').Router();
const db = require('../modules/DB-config');
const bcrypt = require('bcrypt'); // Хеширование данных
const multer = require('multer');
const path = require('path');
const { hostname } = require('os')
const {
  readdirSync,
  unlinkSync
} = require('fs');
// Moduls
const ModCrypto = require('../modules/secret');




const key = process.env.MYKEY, // переменная окружения
  maxSize = 3000000; // максимальный размер 3мб

// Multer settings
// Определение конфигурации хранения
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/images/avatars");
  },
  filename: (req, file, cb) => {
    let name = req.session.user.personalID;
    let type = '.' + file.mimetype.split("/")[1];
    try {
      const root = path.join(__dirname, '..', 'public', 'data', 'images', 'avatars')
      const files = readdirSync(root, 'utf8')
      for (const file of files) {
        if (file.split("-")[0] == req.session.user.personalID) unlinkSync(path.join(__dirname, '..', 'public', 'data', 'images', 'avatars', file)) // удаление уже существующих изображений данного пользователя
      }
    } catch (error) {
      console.error(error)
    }
    cb(null, name + '-' + ModCrypto.encryptCip(Date.now().toString(), key, 'aes-192-cbc') + type);
  }
});
// определение фильтра
const fileFilter = (req, file, cb) => {

  if (file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
// Определение объекта мулер
let upload = multer({
  storage: storageConfig,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxSize,
  }
}).single('avatars')

// использование multer в этом маршруте

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

router.get('/registration-data', (req, res, next) => {
  let user = req.session.user;

  res.render('layouts/settings-register', {
    title: "Регистрационный данные",
    isVisiableMainBlock: false,
    email: user.email,

  })
})

router.post('/upload', upload, (req, res, next) => {
  // Обновляем avatar пользователя

  let userInfo, update, imageUrl,
    avatar = req.file;
  try {
    if (!avatar) {
      if(req.body.src){
        if (!req.body.src.match(/^data:([A-Za-z-+/]*)/i))
          imageUrl = req.body.src;
      }
    } else {

        // Everything went fine.
        if (avatar) {
          imageUrl = "http://" + req.headers.host + "/images/avatar/" + avatar.filename;
          console.log("avatar" + avatar)
        } else {
          console.log(avatar)
          console.log("errr")
        }


    }
    // Обновляем данные пользователя

    if (req.session.user.profileImage != imageUrl && imageUrl) {
      console.log("imageUrl:" + imageUrl)
      req.session.user.profileImage = imageUrl;
      userinfo = [imageUrl];
      update = `UPDATE mytable SET photo=? WHERE personalID='${req.session.user.personalID}'`;
      db.query(update, userinfo, function (error, results) {
        if (error) console.error(error);
      });
    }
  } catch (error) {
    console.error(error);
  }
  res.redirect('/settings');
})


router.post('/save-settings', (req, res, next) => {
  let form = req.body;
  let user = req.session.user;

  if (!form.name || form.name == '') form.name = "User" + req.session.user.personalID
  // Перебор внесенных данных и если ничего не ввел, то null // Если поменял что-то, то это в сесси меняется
  console.log(form)
  for (let element in form) {
    let el = form[element];
    if (element == 'name') {
      user.name = form.name;
      continue;
    }
    if (!el || el != '' || el != '0') user.profileSettings[element] = form[element];
    else user.profileSettings[element] = null;
  }

  req.session.user = user;

  let userInfo = [user.name, form.sername, form.bio, form.birthday, form.gender, form.phone1, form.phone2, form.phone3, form.seconedEmail, user.personalID];
  let update = `UPDATE mytable SET name=?, sername=?, bio=?, birthday=?, gender=?, phone1=?, phone2=?, phone3=?, seconedEmail=? WHERE personalID=?`;

  // Обновляем данные пользователя
  db.query(update, userInfo, function (error, results) {
    if (error) console.error(error);
    res.redirect('/settings');
  });


})
//PUT - используется для обновления уже существующей записи(ей);
router.put('/registration-data/change-account-password', (req, res, next) => {
  let user = req.session.user;
  let password = req.body.oldPassword; // пароль
  let newPassword = req.body.newPassword;
  let newRptPassword = req.body.newRptPassword;

  let update = `UPDATE mytable SET password=? WHERE email=?`;

  if (newPassword == newRptPassword) {
    if (newPassword.length >= 6) {
      newPassword = bcrypt.hashSync(newPassword, 7);

      // Ищем такого пользователя
      db.query(`SELECT * FROM mytable WHERE email=?`, [user.email], function (error, results) {
        // Находим
        const validPassword = bcrypt.compareSync(password, results[0].password) // Расшифрока пароля. bool 
        if (validPassword) { // Тут еще будет проверка на новый пароль
          db.query(update, [newPassword, user.email], (err, results) => {
            if (err) console.error(err)
          }); // Меняем пароль

          res.send({
            isInvalidPassword: false
          }); //Отправка на клиентский js cм. index.js
        } else {
          res.send({
            isInvalidPassword: true
          }); //Отправка на клиентский js
        }
      });
    } else {
      res.send({
        errorMessage: 1
      }) // 1 - пароли не подходят по нормам; 0 - пароли новый и дублируемый новый не совпадают
    }
  } else {
    res.send({
      errorMessage: 0
    })
  }
})
router.delete('/registration-data/delete-account', (req, res, next) => {
  let user = req.session.user;
  let password = req.body.password; // пароль

  // Ищем такого пользователя
  db.query(`SELECT * FROM mytable WHERE email=?`, [user.email], function (error, results) {
    // Находим
    const validPassword = bcrypt.compareSync(password, results[0].password) // Расшифрока пароля. bool

    if (validPassword) {
      // Удаляет аккаунт
      db.query(`DELETE FROM mytable WHERE email=?`, [user.email], (error, results) => {
        if (error) console.error(error);
        req.session.destroy((err) => { //
          if (err) console.error(err);
          res.send({
            isInvalidPassword: false
          }); //Отправка на клиентский js cм. modal_user.js
        });
      })


    } else {
      res.send({
        isInvalidPassword: true
      }); //Отправка на клиентский js
    }

  });


})

module.exports = router;