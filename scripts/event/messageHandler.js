var Message = require('./messageServer').Message;

var message = new Message();
message.on("new_message", function(data){
	console.log(data);
});


message.emit("new_message", "connecting...");