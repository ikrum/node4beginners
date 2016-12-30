var express = require('express');
var router = express.Router();
var userCtl = require('../controllers/user.ctrl');

router.get('/', userCtl.getUser);
router.get('/message', userCtl.getMessage);

module.exports = router;
