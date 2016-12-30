var express = require('express');
var router = express.Router();
var userRoute = require('./user.route');

router.use('/users',userRoute); // localhost:3000/api/users
router.use('/events',userRoute); // localhost:3000/api/events
router.use('/groups',userRoute); // localhost:3000/api/groups
router.use('/games',userRoute); // localhost:3000/api/games

module.exports = router;
