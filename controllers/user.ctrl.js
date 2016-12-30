exports.getUser = function(req,res,next){
  res.send('users');
}

exports.getMessage = function(req,res,next){
  res.send("this is a message from an user");
}


exports.addUser = function(req,res,next){

	User.findOne({email: req.body.email.toLowerCase()},function(err, user) {
		if(user) return res.json({error:true, message:"Email already exists"});

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
				if (err){
					console.log(err);
					if(err.name == 'ValidationError')
            return res.json({error:ture, message: "Invalid Input"});
					return next(err);
				}

        var data = JOSN.parse(JSON.stringify(user));
        delete data.salt;
        delete data.password;
				res.status(200).json({error:false,message:"New user added",data: data});
			});
		});
	});
}
