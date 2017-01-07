var User = require('../models/user.model');
var sequence = require('../utils/dbHelper').sequenceGenerator('user');

exports.addUser = function(req,res,next){

	User.findOne({email: req.body.email.toLowerCase()},function(err, user) {
		if(user) return next("Email already exists");

		if(!isValid(req.body.number))
			if(user) return next("Email already exists");

		if(!isValid(req.body.number))
			if(user) return next("Email already exists");

		var timeStamp = Date.now();
		var userObj={
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			password: req.body.password,
			create_ts: timeStamp
		};

		// get the next sequence
		sequence.next(function(nextSeq){
			userObj.userid = nextSeq;
			var user = new User(userObj);

			user.save(function(err) {
				if (err) return next(err);

        var data = JSON.parse(JSON.stringify(user));
        delete data.salt;
        delete data.password;
				res.status(200).json({error:false,message:"New user added",data: data});
			});
		});
	});
}

exports.updateUser = function(req,res,next){
  	User.update({
      chapterid:req.body.userid
    },
    {
      $set:{
        status:'Active'
      }
    },function(){

    });
}
exports.deleteUser = function(req,res,next){
	User.remove({ userid:req.params.userid },function(err,doc){
		if(err) return next(err);
		// check if the doc modified ?
		if(doc.result.n<1) return next("Delete unsuccessful");

		res.status(200).json({message:"User deleted"});
	});
}
exports.getUser = function(req,res,next){
  User.findOne({userid: req.params.userid},function(err, result){
    res.json({error: false, message: "single users", data: result});
  });
}
