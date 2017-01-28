var Post = require('../models/post.model');
var sequence = require('../utils/dbHelper').sequenceGenerator('user');

exports.addPost = function (req, res, next) {
  if (!req.body.title || !req.body.post)
    return next('Missing required parameters');

  var obj = {
    title: req.body.title,
    text: req.body.text,
    author:{
      userid: req.user.userid,
      name: req.user.full_name
    },
    created_at: Date.now(),
  }
  var post = new Post(obj);

  post.save(function (err) {
		if(err){
      console.log(err);
      return next(err);
    }

		res.json({ error: false, message: 'New post added', data: post });
  });
};

exports.getPosts = function (req, res, next) {
  Post.find({}, function (err, result) {
    res.json({ error: false, message: 'all posts', data: result });
  });
};
