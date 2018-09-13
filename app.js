var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var api = require('./routes/api');
var messages = require('./lib/messages');
var login = require('./routes/login');
var entries = require('./routes/entries');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);
app.use(messages);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api.auth);
app.get('/api/user/:id', api.user);
app.use(user);
app.use(index.notfound);
app.use(index.error);

app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/post', entries.form);
app.post('/post', 
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]', 4),
    entries.submit);
app.use('/:page?', page(5), entries.list); // this is put last so the optional parameter doesn't consume other routes

app.get('/api/user/:id', api.user);
app.get('/api/entries/:page?', page(5), api.entries);
app.post('/api/entry', entries.submit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
