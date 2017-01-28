var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/post.ctrl');
var authenticate = require('../middlewares/authenticate').authenticate;

router.post('/', authenticate, ctrl.addPost);
router.get('/', authenticate, ctrl.getPosts);

module.exports = router;
