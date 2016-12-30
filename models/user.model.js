"use strict";

var mongoose = require('mongoose');
var sha1 = require('sha1');
var bcrypt = require('bcrypt-nodejs');
var validator = require('../utils/validator')
var Schema = mongoose.Schema;

var User = new Schema({
	userid:{
		type : Number,
		unique : true
	},
	fname:{
		type: String,
		required: true,
		trim: true,
		validate: [validator.isName, "Invalid first name"]
	},
	lname:{
		type: String,
		required: true,
		trim: true,
		validate: [validator.isName, "Invalid last name"]
	},
	full_name:{
		type: String,
		trim: true
	},
	email:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique : true,
		validate: [validator.isEmail, 'Invalid email address']

	},
  passsword:{
		type: String,
		required: true
	},
	salt:{
		type: String
	},
	create_ts:{
		type: Date,
		required: true
	},
	last_update_ts:{
		type: Date,
		default : Date.now
	},
	status:{
		type: String,
		uppercase: true,
		default: 'INACTIVE',
		enum: ['INACTIVE', 'ACTIVE','SUSPENDED']
	}

});


// Pre-Processing before saving docemunet
User.pre('save', function(next) {
	var doc = this;
  var salt = bcrypt.genSaltSync(10);

	if (!doc.isModified('last_update_ts'))
		doc.last_update_ts = Date.now();

	// encrypt password before save
	if (doc.isModified('password')){
		doc.salt = salt;
		doc.password = sha1(doc.password+salt);
	}

	// full name from first name and lastname
	if (doc.isModified('fname') || doc.isModified('lname')){
		doc.full_name = doc.fname +" "+doc.lname;
	}

	next();
});

User.methods.verifyPassword = function(password) {
  return this.password === sha1(password+this.salt);
}
/*
myModel.path('name').validate(function (v) {
    return v.length <= 20;
}, 'The maximum length is 20.');

myModel.path('email').validate(function (v) {
    return v.length <= 140;
}, 'The maximum length is 140.');


myModel.pre('save', function(next) {
	var self = this;
    if (this.isNew) {
      sequence.next(function(nextSeq){
				self.channelid = nextSeq;
				next();
			});
    }
});

*/

module.exports = mongoose.model('User',User);
