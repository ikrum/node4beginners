var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRoute = require('./routes/api.route');


mongoose.connect('mongodb://localhost/geeks', {});
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('Mongo connection error. Please check Mongo is running on the host');
  console.log(err);
});
db.once('open', function () {
  console.log('MongoDb connected.');
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  var message = "Bad request";
  var status = 400;

  if(typeof err == 'string'){
    message = err;
  }else{
    message = err.message;
    status = err.status || 500;

    if(err.name == 'ValidationError')
      message = "Invalid Input for ";

  }

  res.status(status).json({error:true, message:message});

});

module.exports = app;
