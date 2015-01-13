var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
function reqHandler(req,res) {
    console.log('request recieved: ', req);
    file.serve(req, res);
};
http.createServer(reqHandler).listen(8080);

console.log('Server running on port 8080');