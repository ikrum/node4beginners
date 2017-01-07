var express = require('express');
var router = express.Router();
var userRoute = require('./user.route');
var userCtl = require('../controllers/user.ctrl');
var authenticate = require('../middlewares/authenticate').authenticate;

router.use('/users',authenticate, userRoute); // localhost:3000/api/users
router.post('/auth', userCtl.login);
router.get('/movies', function(req,res,next){
  res.json({
      "error": false,
      "message": "all movies",
      "data": [
          {
              "_id": "5870a085326c6a15e4541a8e",
              "name": "Titanic",
              "create_ts": "2017-01-07T08:02:13.906Z",
              "movieid": 1,
              "__v": 0
          },
          {
              "_id": "5870a0a6326c6a15e4541a8f",
              "name": "Blood Money",
              "create_ts": "2017-01-07T08:02:46.374Z",
              "movieid": 2,
              "__v": 0
          },
          {
              "_id": "5870a0bd326c6a15e4541a90",
              "name": "Rush Hour",
              "create_ts": "2017-01-07T08:03:09.794Z",
              "movieid": 3,
              "__v": 0
          },
          {
              "_id": "5870b2ea35ae7a1cd2b87b7d",
              "name": "Kunfu Panda",
              "create_ts": "2017-01-07T09:20:42.476Z",
              "movieid": 4,
              "__v": 0
          }
      ]
  });
});

module.exports = router;
