// Module dependencies.
const createError = require('http-errors'),
  expressHbs = require('express-handlebars'),
  hbs = require('handlebars'),
  session = require('express-session'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan');
const express = require('express'),
  app = express();
const debug = require('debug')('myapp:server'),
  http = require('http');

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Create HTTP server.
var server = http.createServer(app);


//Get socket.io
// const io = require('socket.io')(server);
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// Routes
const homeRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const newsRouter = require('./routes/news');
const contactsRouter = require('./routes/contacts');
const loginRouter = require('./routes/login');
const ConfirmEmail = require('./routes/verify');
const memberRouter = require('./routes/member');
const siteSettingsRouter = require('./routes/site-settings');
const settingsRouter = require('./routes/settings');
const categoriesRouter = require('./routes/categories');

// Modules
const hbsCreater = require('./modules/hbsCreater');

// Middleware
const checkRoles = require('./middleware/checkRoles');
const checkAuth = require('./middleware/checkAuthorization');

// View engine setup
app.engine('hbs', expressHbs({
  extname: 'hbs',
  defaultView: 'default',
  defaultLayout: __dirname + '/views/layouts/main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    getTitle: (title) => {
      return title == undefined ? "No title" : title
    },
    isObject: (el) => {
      return typeof el == 'object' ? true : false;
    },
    getCategoriesName: (arr) => {
      return arr.name;
    },
    getIndividualCategoriesNumber: (arr) => {
      return arr.identNumber;
    },
    getUndefined: (data) => {
      return data == undefined ? true : false;
    },
    getGender: (sex) => {
      if (sex == '') return 'выберите'
      return sex == "1" ? "муж" : "жен";
    },
    creatPageMenu: (amount) => {
      let scrollMenu = '';
      for (let i = 1; i <= Math.ceil(amount / 30); i++) {
        scrollMenu += `<button id='${i}'>${i}</button>`;
      }
      return new hbs.SafeString(scrollMenu);
    }
  }
}));
app.set('view engine', 'hbs');

// Cоздаем хранилище для сессий
const sessionHandler = require('./modules/db-session');
const store = sessionHandler.createStore();

// logger отвечает за логирование HTTP запросов, 
// cookieParser — за обработку cookies, 
// session — за работу с сессиями,
// static — за работу со статическим контентом (css, javascript, картинки),
// errorHandler — за обработку ошибок
// bodyParser - парсить с сайта информацию

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(express.multipart());
app.use(cookieParser('secret key'));
app.use(express.static(path.join(__dirname, 'public')));

// Создание сесси
app.use(session({
  store: store,
  secret: 'IndeficatorKey',
  proxy: true,
  resave: false,
  saveUninitialized: false
}));

// Действия на всех страницах(отображение hbs элементов, выполнение проверок, отправка данных и тд);
app.use('/', (req, res, next) => {
  // hbs.registerHelper('clear', (block) => { // Очищает все значения, передаваемые hbs
  //   let helpers = block.data.root;
  //   block.data.root.isVisibleSubMenu = false;
  //   console.log(helpers)
  // })
  if (req.session.user != undefined && req.session.user.status == "login") {
    hbsCreater.createHelpMenu(req, res);
  }
  hbsCreater.getIsUser(req, res);
  hbsCreater.getAvatar(req, res);
  next();
})

// Роутеры
app.use('/', homeRouter);
app.use('/registration', checkAuth, registrationRouter);
app.use('/news', newsRouter);
app.use('/contacts', contactsRouter);
app.use('/login', checkAuth, loginRouter);
app.use('/verify', ConfirmEmail);
app.use('/categories', categoriesRouter);
app.use('/member', checkRoles(['ADMIN']), memberRouter);
app.use('/site-settings', checkRoles(['ADMIN']), siteSettingsRouter);
app.use('/settings', checkRoles(['USER', 'SELLER', 'ADMIN']), settingsRouter);


// Выход из аккаунта
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err)
    res.redirect('/');
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (err.status == 404) {
    res.render('404_error', {
      title: "404",
      pageUrl: req.originalUrl,
      inputIsVisible: false
    }); // если ошибка 404 рендерится это
  } else {
    res.render('error');
  }
});


//************ Create app-server connection */ 

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port); // /*, '192.168.100.14'*/ Если хочешь, то локально по сети работает просто раскомментриуй
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  console.log("Server created on http://127.0.0.1:" + addr.port);
  debug('Listening on ' + bind);
}