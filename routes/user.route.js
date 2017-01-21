var express = require('express');
var router = express.Router();
var userCtl = require('../controllers/user.ctrl');
var authenticate = require('../middlewares/authenticate').authenticate;

// POST localhost:3000/api/users
router.post('/', userCtl.addUser);

// GET localhost:3000/api/users
router.get('/', authenticate, userCtl.getUsers);
router.get('/test', authenticate, function(req,res,next){
  res.json(req.user);
});

// GET localhost:3000/api/users/23
router.get('/:userid', authenticate, userCtl.getUser);

// DELETE localhost:3000/api/users/23
router.delete('/:userid', authenticate, userCtl.deleteUser);

module.exports = router;
