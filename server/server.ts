import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import express = require('express');
import mongoose = require('mongoose');
import session = require('express-session')
import url = require('url');
import https = require('https');
import fs = require('fs');
import pages = require('./pages');

require('source-map-support').install({
	environment: 'node'
});

mongoose.connect('mongodb://localhost/server');

var app = express();
app.use('/', express.static('../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: '9738b7e231db7666afce75050fa2f310',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000/*, secure: true*/ }
}));

var pageManager = new pages();
app.use(pageManager.getRequestHandler());


var httpsOptions: https.ServerOptions = {};
httpsOptions.key = fs.readFileSync('private/ssl.key', 'utf8');
httpsOptions.cert = fs.readFileSync('private/ssl.cer', 'utf8');

var httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(443);