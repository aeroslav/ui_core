var http = require('http');
var statServ = require('node-static');
var qs = require('querystring');
var url = require('url');
var file = new statServ.Server('.');

function reqHandler(req, res) {

    var postBody = '',
        post = null,
        text = '';

    if (req.method === "GET") {
        file.serve(req, res);
    } else if (req.method === "POST") {
        if (req.url === '/processJSON') {
            req.on('data', function(chunk){
                postBody += chunk;
            })
            req.on('end', function(){
                console.log(postBody);
                post = qs.parse(postBody);
                if (post.login === 'admin' && post.pwd === '123') {
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.write('access granted!');
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.write('access denied!');
                    res.end();
                }
            });
        }
    }
};

http.createServer(reqHandler).listen(8080);

console.log('Server running on port 8080');