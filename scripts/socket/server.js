var io = require('socket.io')(4545);


io.on('connection', function (socket) {
  console.log("new client connected");

  socket.on('send', function (data) {
    console.log("sending...",data);
  });

  socket.on('status', function(data) {
    socket.emit('status_reply',{message: "Everything is fine", status: 'OK'});
   });

  socket.on("new_message", function(data){
    console.log("server recieved new message");
    io.emit("new_reply", {message: "I have got your message", reply: 'Here is my reply'});
  });

  socket.on('disconnect', function(){
    console.log("user disconnected");
  });

  setInterval(function(){
    //io.emit("new_notification", {message: "New post added to your group"});
  }, 5000);
});



io.on('close', function(){
  console.log('io closed');
});
