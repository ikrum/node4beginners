const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const apiRoute = require('./routes/api.route');
const kue = require('kue');
const ui = require('kue-ui');

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

/* Job queue */
kue.createQueue({redis: 'redis://localhost:6379/0'});
ui.setup({
    apiURL: '/kue_api', // IMPORTANT: specify the api url, Expose api for Kue UI
    baseURL: '/kue', // IMPORTANT: specify the base url
    updateInterval: 5000 // Optional: Fetches new data every 5000 ms
});
kue.app.set('title', 'GEEK Queue');
app.use('/kue_api', kue.app); // Mount kue JSON api
app.use('/kue', ui.app); // Mount UI

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

// allow cross origin , option request
var headers = "Origin, X-Requested-With, Content-Type, Accept, "
              +"Authorization,Content-Type, Content-Length";

app.options("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header("Access-Control-Allow-Headers", headers);
   //other headers here
    res.status(200).end();
});


// allow cross origin for regular request
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', headers);
    next();
};


app.use(allowCrossDomain);

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

  if(message.indexOf('Authentication') != -1)
    status = 401;

  res.status(status).json({error:true, message:message});

});

module.exports = app;
