
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/server');

var models = require('./models.js');
var pages = include('./pages.js');

var requestFunc = function (req, res)
{	
	var pageName = req.url.substring(1);
	if (pages[pageName])
	{
		var obj = {};
		var code = pages[pageName].run(req, obj);
		
		res.writeHead(code, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(obj));
	}
	else
	{
		res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
		res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
	}	
};

var http = require('http');
var server = http.createServer(requestFunc).listen(8080);
