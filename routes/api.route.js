var express = require('express');
var router = express.Router();
//var userRoute = require('./user.route');

//router.use('/users',userRoute); // localhost:3000/api/users

router.get('/test',function(req,res,next){
  console.log('First controller');
  next();
}, function(req,res,next){
  console.log('second controller');
  next();
}, function(req,res,next){
  res.send('test');
});

module.exports = router;
