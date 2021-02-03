// Подключаем библиотеку mysql
const mysql = require('mysql2');
// Криптография
const crypto = require('crypto')
const express = require("express");
const bodyParser = require("body-parser");
const pool = require('./dbconfig')

const app = express()

const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// HBS
app.set("view engine", "hbs");
// Пользовательские данные
const id_user = crypto.randomBytes(4).toString('hex')



app.get('/', (req, res) => {
  pool.query('SELECT * FROM mytable', (err, results) => {
    if (err) return console.log(err);
    res.render("index.hbs", {
      mytable: results
    });
  });
})


app.get('/register', (req, res) => {
  res.render("create.hbs");
});

app.post('/register', urlencodedParser, (req, res) => {

  if (!req.body) return res.sendStatus(404);
  const email = req.body.email;
  const login = req.body.login;
  const password = req.body.password;
  const number = req.body.number;

  console.log(email)

  // Проверка 
  pool.query(`SELECT id_user, email,login,number FROM mytable WHERE (id_user=? or email=? OR login=? OR number=?)`, [id_user, email, login, number], function (error, results) {
    // дальше работа с обычным массивом
    if (results.length === 0) {
      // console.log("Нет такого аккаунта");
      // Добавить пользователя. С*ка вот здесь он не работает
      pool.query(`INSERT INTO mytable(id_user, email, login, password, number) VALUES (?,?,?,?,?)`, [id_user, email, login, password, number], function (error, results) {

        if (error) console.log(error);
        else console.log('Аккаунт Добавлен');

      });
    } else {
      console.log('Такой аккаунт уже существует');
    }
  });
  res.render('index.hbs')
});

app.get('/login', (req, res) => {
  res.render('login.hbs')
})

app.post('/login', urlencodedParser, (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  console.log(login)

  pool.query(`SELECT login, password FROM mytable WHERE (login=? and password=?)`, [login, password], function (error, results) {

    if (results.length==0){
      res.send('Вы ввели неверный логин или пароль')
    }
    else{
      res.send('Отлично')
    }
  });

});
app.listen(8080, () => {
  console.log('Cервер запущен')
})