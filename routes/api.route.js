var express = require('express');
var router = express.Router();
var userRoute = require('./user.route');
var userCtl = require('../controllers/user.ctrl');


router.use('/users', userRoute); // localhost:3000/api/users
router.post('/auth', userCtl.login);

module.exports = router;
