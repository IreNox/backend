"use strict";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const https = require('https');
const fs = require('fs');
const pages = require('./pages');
require('source-map-support').install({
    environment: 'node'
});
var MongoStore = connectMongo(session);
mongoose.connect('mongodb://localhost/server');
var app = express();
app.use('/', express.static('../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: '9738b7e231db7666afce75050fa2f310',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 /*, secure: true*/ }
}));
var pageManager = new pages();
app.use(pageManager.getRequestHandler());
var httpsOptions = {};
httpsOptions.key = fs.readFileSync('data/ssl.key', 'utf8');
httpsOptions.cert = fs.readFileSync('data/ssl.cer', 'utf8');
var httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(443);
//# sourceMappingURL=server.js.map