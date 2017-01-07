var express = require('express');
var router = express.Router();
var userCtl = require('../controllers/user.ctrl');

router.post('/', userCtl.addUser); // POST localhost:3000/api/users
router.get('/', userCtl.getUsers); // GET localhost:3000/api/users
router.get('/test',function(req,res){
  res.json(req.user);
}); // GET localhost:3000/api/users

router.get('/:userid', userCtl.getUser); // GET localhost:3000/api/users
module.exports = router;
