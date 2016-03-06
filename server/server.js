var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var https = require('https');
var fs = require('fs');
var pages = require('./pages');
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
    cookie: { maxAge: 60 * 60 * 1000 /*, secure: true*/ }
}));
var pageManager = new pages();
app.use(pageManager.getRequestHandler());
var httpsOptions = {};
httpsOptions.key = fs.readFileSync('private/ssl.key', 'utf8');
httpsOptions.cert = fs.readFileSync('private/ssl.cer', 'utf8');
var httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(443);
//# sourceMappingURL=server.js.map