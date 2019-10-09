var http = require('http');

http.createServer(function(req,res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  res.setHeader('Access-Control-ALlow-Methods', 'GET, POST');
  req.setEncoding('utf8');
  res.end(JSON.stringify({data:'hello world!'}));
}).listen(8080,function() {
  console.log('listening on http:/localhost:8080')
})
