
var express = require('express'),
	app = express();
	var passport = require('passport');



var port = process.env.PORT || 80;

var client = require('socket.io').listen(app.listen(port));

require('./auth')(passport);
require('./Socket')(client);
require('./config')(app, client);
require('./routes')(app,passport);

console.log('Your application is running on http://localhost:' + port);
