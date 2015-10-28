var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var pages = require('./pages');
mongoose.connect('mongodb://localhost/server');
var app = express();
app.use('/client', express.static('../client'));
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
app.listen(8080);
//# sourceMappingURL=server.js.map