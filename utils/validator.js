"use strict";

// Email Validator
exports.isEmail = function(text){
	if(typeof text != "string") return false;
	var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return text.match(new RegExp(expression)) ? true:false;
}

// Name validator
exports.isName = function(text){
  if(typeof text != "string") return false;
	return text.length<50 && text.length>2;
}
