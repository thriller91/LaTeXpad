var express = require('express');
var app = express();

app.configure(function(){
  app.use(express.static(__dirname + '/'));
});

app.get('/', function(req, res){
  res.render('./index.html');
});

app.listen(3000);
