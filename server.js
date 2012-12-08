var express = require('express'), app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.configure(function(){
  app.use(express.static(__dirname + '/'));
});

app.get('/', function(req, res){
  res.render('./index.html');
});

