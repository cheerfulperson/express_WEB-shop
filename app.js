const createError = require('http-errors');
const express = require('express');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const newsRouter = require('./routes/news');
const forumRouter = require('./routes/forum');
const contactsRouter = require('./routes/contacts');

const app = express();

// view engine setup
app.engine('hbs', expressHbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/news', newsRouter);
app.use('/forum', forumRouter);
app.use('/contacts', contactsRouter);


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
