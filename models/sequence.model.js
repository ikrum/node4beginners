"use strict";

var mongoose = require('mongoose');

var SequenceSchema = new mongoose.Schema({
	name: String,
	nextSeqNumber: { type: Number, default: 1 }
});

module.exports = mongoose.model('sequence', SequenceSchema);