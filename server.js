var express = require('express'), app = express()
  , server = require('http').createServer(app);

server.listen(8080);

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
  child = exec('python2 getTeXfile.py LaTeX',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    res.redirect('/');
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});
