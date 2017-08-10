var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var favicon = require('serve-favicon');


//
var index = require('./routes/index');
var wiki = require('./routes/wiki');
var app = express();

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Routing
app.use('/', index);
app.use('/wiki', wiki);

//app.use('/users', users); implement when page owning is available.

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
  res.render('error'); //404 for /wiki/<URL ENTERED> renders page_Not_Found page which allows user to create new article.
});

module.exports = app;