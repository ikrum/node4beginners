exports.getUser = function(req,res,next){
  res.send('users');
}

exports.getMessage = function(req,res,next){
  res.send("this is a message from an user");
}
