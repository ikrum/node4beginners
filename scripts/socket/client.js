var socketio = require('socket.io-client');
var readline = require('readline');


var colors = require('colors');
var prefix = colors.gray("CLIENT ");
var serverPrefix = colors.gray("SERVER ");


var socket = socketio("http://localhost:4545");
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(":> ");

socket.on('connect', function(){
  rl.prompt(true);

  rl.on('line', function (line) {
    line=line.trim();

    if(line=="status"){
        socket.emit('status');
    }else if(line=="new_message"){
       socket.emit('new_message');
    }

  });
});


socket.on('status_reply',function(data){
  console.log(serverPrefix+data.message);
  rl.prompt(true);
  
});

socket.on('new_reply',function(data){
  console.log(serverPrefix+data.message);
  rl.prompt(true);
});
socket.on('new_notification',function(data){
  console.log(serverPrefix+data.message);
});

socket.on('connect_error', function(err){
  console.log("connect_error");

});
socket.on('connect_timeout', function(){
  console.log("connect_timeout");
});

socket.on('disconnect', function(){
  console.log("Disconnected");
  process.exit();
});
