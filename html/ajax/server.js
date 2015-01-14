var http = require('http');
var statServ = require('node-static');
var qs = require('querystring');
var url = require('url');
var file = new statServ.Server('.');

function reqHandler(req, res) {

    var commonResponse = '<!DOCTYPE html><html><head><title>response</title></head><body><h1>Response</h1>for your request</body></html>';

    if (req.method === "GET") {
        //var params = url.parse(req.url, true);
        file.serve(req, res);
    } else if (req.method === "POST") {
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.write(commonResponse);
        res.end();
    }
};

http.createServer(reqHandler).listen(8080);

console.log('Server running on port 8080');