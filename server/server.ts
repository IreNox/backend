import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
import * as url from 'url';
import * as https from 'https';
import * as fs from 'fs';
import Pages from './pages';

var config = process.env.NODE_ENV || 'development';

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
    cookie: { maxAge: 60 * 60 * 1000/*, secure: true*/ }
}));

var pageManager = new Pages();
app.use(pageManager.getRequestHandler());

var httpsOptions: https.ServerOptions = {};
httpsOptions.key = fs.readFileSync('data/ssl.key', 'utf8');
httpsOptions.cert = fs.readFileSync('data/ssl.cer', 'utf8');

var httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(443);
