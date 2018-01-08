
var express = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');
session = require('express-session');
cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

module.exports = function(app, client){

	app.set('view engine', 'html');

	app.engine('html', require('ejs').renderFile);

	app.set('views', __dirname + '/views');

	app.use(express.static(__dirname + '/public'));


	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());
	app.use(flash());

};
