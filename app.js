const createError = require('http-errors');
const express = require('express');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const os = require("os");

const hbsCreater = require('./moduls/hbsCreater');
const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const newsRouter = require('./routes/news');
const contactsRouter = require('./routes/contacts');
const loginRouter = require('./routes/login');
const ConfirmEmail = require('./routes/verify')
const memberRouter = require('./routes/member')
const statsRouter = require('./routes/stats')
const checkRoles = require('./middleware/checkRoles')
const checkAuth = require('./middleware/checkAuthorization')



const app = express();

// view engine setup
app.engine('hbs', expressHbs( {
  extname: 'hbs',
  defaultView: 'default',
  defaultLayout: __dirname + '/views/layouts/main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    getTitle: (title) => {
      return title == undefined ? "No title" : title
    },
    toUpperCase: (word) =>{
      return word.toUpperCase();
    },
    getMainBlock: (isUserlogin) => {
      return isUserlogin == undefined ? true : false;
    },
    
  }
}));
app.set('view engine', 'hbs');

// Cоздаем хранилище для сессий
const sessionHandler = require('./moduls/db-session');
const store = sessionHandler.createStore();

// logger отвечает за логирование HTTP запросов, 
// cookieParser — за обработку cookies, 
// session — за работу с сессиями,
// static — за работу со статическим контентом (css, javascript, картинки),
// errorHandler — за обработку ошибок
// bodyParser - парсить с сайта информацию

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret key'));
app.use(express.static(path.join(__dirname, 'public')));
// Создание сесси
app.use(session({
  store: store,
  secret: 'you secret key',
  saveUninitialized: true,
}));


// Действия на всех страницах(отображение hbs элементов, выполнение проверок, отправка данных и тд);
app.use('/', (req, res, next) => {
if(req.session.user != undefined && req.session.user.status == "login"){
    hbsCreater.createHelpMenu(req, res);
  }
    hbsCreater.getIsUser(req, res);
  next();
})

// Роутеры
app.use('/', indexRouter);
app.use('/registration', checkAuth,registrationRouter);
app.use('/news', newsRouter);
app.use('/contacts', contactsRouter);
app.use('/login',checkAuth,loginRouter);
app.use('/verify',  ConfirmEmail);
app.use('/member',checkRoles(['ADMIN']), memberRouter);
app.use('/stats',checkRoles(['SELLER','ADMIN']), statsRouter);


// Выход из аккаунта
app.post('/logout', (req, res) => {
 req.session.destroy(()=>{
 res.redirect('/')  // НЕ РАБОТАЕТ
 });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


