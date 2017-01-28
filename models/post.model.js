'use strict';

var sequence = require('../utils/dbHelper').sequenceGenerator('post');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  postid:{
    type: Number,
    unique: true
  },
	title: {
		type: String,
		required: true,
		trim: true
	},
	text: {
    type: String,
		required: true,
		trim: true
  },
  author: {
    userid: Number,
    name: String,
  },
  created_at: Date,
  updated_at: {
    type: Date,
    default: Date.now()
  }
});


Post.pre('save', function(next) {
  console.log('pre-save');
	var self = this;
    if (this.isNew) {
      console.log("saving a new post");
      sequence.next(function(nextSeq){

        console.log('Generating post id:',nextSeq);
				self.postid = nextSeq;
				next();
			});
    }
});



module.exports = mongoose.model('Post',Post);
