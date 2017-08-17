var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var favicon = require('serve-favicon');


//
var index = require('./routes/index');
var wiki = require('./routes/wiki');
var wiki_image = require('./routes/wiki_image');
var app = express();

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', index);
app.use('/wiki', wiki);
app.use('/wiki_image',wiki_image);

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
  res.locals.error = req.app.get('env') === 'development' ? err : {}; //WHen done copmletely, remember to make production error handler for no leaked stacktraces.
  switch(err.code)
  {
    case 'ER_DUP_ENTRY':
      return res.send('Title already in use');
      break;
    case 'LIMIT_FILE_SIZE':
      return res.send('Image size too big. Limit is 4MB');
      break;
    case 'INVALID_FILE_TYPE': //Custom Error
      return res.send('Invalid file type. File must be .jpg, .png, or .jpeg');
      break;
    case 'ER_DUP_IMAGE':
      return res.send('Image name already exists');
      break;
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;