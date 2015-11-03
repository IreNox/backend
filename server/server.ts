import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import express = require('express');
import mongoose = require('mongoose');
import session = require('express-session')
import url = require('url');
import pages = require('./pages');

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
    cookie: { maxAge: 60 * 60 * 1000/*, secure: true*/ }
}));

var pageManager = new pages();
app.use(pageManager.getRequestHandler());

app.listen(8080);