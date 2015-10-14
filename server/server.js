var bodyParser = require('body-parser')
var express = require('express');
var mongoose = require('mongoose');
var url = require('url');

mongoose.connect('mongodb://localhost/server');

var models = require('./models.js');
var pages = require('./pages.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var requestFunc = function (req, res) {	
	var pageName = url.parse(req.url).pathname.substring(1);
	if (pages[pageName]) {
	    var inputData = {};
	    if (req.method == 'POST') {
	        for (var key in req.body) {
	            inputData[key] = req.body[key];
	        }
	    }

	    for (var key in req.query) {
	        inputData[key] = req.query[key];
	    }

	    pages[pageName].run(inputData, function (code, obj) {
	        res.writeHead(code, { 'Content-Type': 'application/json' });
	        res.end(JSON.stringify(obj));
	    });
	}
	else
	{
		res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
		res.end(JSON.stringify({ error: "Not found", pageName: pageName}));
	}	
};
app.get('/*', requestFunc);
app.post('/*', requestFunc);
app.listen(8080);

