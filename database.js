

var Datastore = require('nedb'),
	fs = require('fs');


// Initialize two nedb databases
var	users=new Datastore({filename:__dirname +'/data/users', autoload: true });
   photos = new Datastore({ filename: __dirname + '/data/photos', autoload: true });
   messages=new Datastore({filename:__dirname +'/data/messages', autoload: true });
	 Friends=new Datastore({filename:__dirname +'/data/Friends', autoload: true });
	 notifications=new Datastore({filename:__dirname +'/data/notifications', autoload: true });


photos.ensureIndex({fieldName: 'name', unique: true});



  module.exports = {
  messages:messages,
	photos  :photos,
  	users: users,
			Friends: Friends,
		notifications:notifications

  };
