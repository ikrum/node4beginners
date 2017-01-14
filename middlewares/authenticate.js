"use strict";
var tokenizer = require('../utils/tokenizer');


/*
 * authenticate   Validate the authentication token
 * @param token   req.headers.token
 */
exports.authenticate = function(req,res,next){
  // validate authentication token
  var token = req.headers.token ;
  if(!token) return next('Authentication token required');

  tokenizer.verifyToken(token, function(err, decoded) {
    if(err) {
      if(err.name == 'TokenExpiredError')
        return next('Authentication token expired');

      return next('Authentication token invalid');
    }
    req.user = decoded;
    next();
  });
}
