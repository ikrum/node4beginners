var EventEmitter = require("events").EventEmitter;

var ee = new EventEmitter();
ee.on("new_message", function (message) {
		if(!message) return console.log("empty message event");

    console.log("new message found: ", message);
});

ee.emit("new_message"); // empty message


setInterval(function() {
    ee.emit('new_message', 'whats up?');
}, 5000);


setInterval(function() {
    ee.emit('new_message', 'I am fine!');
}, 6000);
