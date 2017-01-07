var express = require('express');
var router = express.Router();
var userRoute = require('./user.route');

router.use('/users',userRoute); // localhost:3000/api/users

module.exports = router;
