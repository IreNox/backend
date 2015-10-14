var http = require('http');

var func = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hallo Welt!');
};
var server = http.createServer(func).listen(8080);

console.log('Der Webserver ist erreichbar unter http://*:8080/');
