var express = require('express'), app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
server.listen(port);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

app.configure(function(){
  app.use(express.static(__dirname + '/'));
});

app.get('/', function(req, res){
  res.render('./index.html');
});


var exec = require('child_process').exec,
    child;

app.post('/', function(req,res) {
  console.log("ORDER!");
  child = exec('./getTeXfile.py LaTeX',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    res.redirect('/');
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});


var users = 0;

io.sockets.on('connection', function (socket) {

  socket.on('adduser', function(){
    users += 1;
    socket.emit('updateusers', users);
  });

   socket.on('disconnect', function(){
    users -= 1;
    socket.emit('updateusers', users);
  });

});

