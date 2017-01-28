var express = require('express');
var router = express.Router();
var userRoute = require('./user.route');
var postRoute = require('./post.route');
var userCtl = require('../controllers/user.ctrl');

var testController = require('../testController');

router.use('/users', userRoute); // localhost:3000/api/users
router.use('/posts', postRoute); // localhost:3000/api/posts
router.post('/auth', userCtl.login);

router.get('/anik', testController.get);


module.exports = router;
