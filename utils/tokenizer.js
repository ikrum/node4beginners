var jwt = require('jsonwebtoken');

var API_TOKEN_EXPIRES_IN = 60*60*24; // 1 Day
var API_SECRET_KEY = "398cr3u43j894ur9043ur90384yt9834uc";

/*
 * verifyToken		Verify the encrypted token
 * @param callback,	function(err, decoded){ }
 */
exports.verifyToken = function(token, callback){
	jwt.verify(token, API_SECRET_KEY, callback);
}

function generateToken(data) {
  data.time = Date.now();
  var opts = { expiresIn: API_TOKEN_EXPIRES_IN };
	var token = jwt.sign(data, API_SECRET_KEY, opts);
	return token;
}
