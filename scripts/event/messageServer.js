var util = require('util');
var EventEmitter = require('events').EventEmitter;

var messageDatabase = [
	"Wanna go for a walk, are you interested?",
	"Oh shit ! its raining",
	"so sweet!",
	"really?",
	"come on! lets see the view"
];

// create message class
function Message(){
	var self = this;

	self.on("connect",function(){
		console.log("Connected to the message server");
	});

	setTimeout(function(){
		self.emit("connect");
	}, 1000);


	setInterval(function() {
		var randomIndex = Math.floor(Math.random() * (4 - 0 + 1));		
		var message = messageDatabase[randomIndex];
    self.emit('new_message', message);
	}, 3000);

}

// extend eventEmitter
util.inherits(Message, EventEmitter);
//Message.prototype = Object.create(require('events').EventEmitter.prototype);

exports.Message = Message;


