var db = require('./database'),
	messages = db.messages,
	users = db.users,
	Friends = db.Friends,
	notifications=db.notifications;



module.exports = function(app,passport){


app.get('/send', function(req, res){

	users.findOne({"username":req.user.username}, function(err, data){

		res.send(data);


	});

				});

	app.post('/send', function(req, res){

					users.findOne({"username":req.user.username}, function(err, data){

						res.send(data);
					});

				});

				app.get('/User', function(req, res){

								users.find({}, function(err, data){

									res.send(data);
								});

							});


				app.post('/status', function(req, res){
console.log(req.body);

users.update({username: req.body.Username }, { $set: { status: req.body.status } }, { multi: true }, function (err, numReplaced) {
console.log(numReplaced);
});
Friends.update({Friend: req.body.Username }, { $set: { status: req.body.status } }, { multi: true }, function (err, numReplaced) {
console.log(numReplaced);
});

users.findOne({'username': req.user.username}, function(err, data){
	           res.send( data);
});
							});


//Add friend
app.post('/AddFriend', function(req, res){
	console.log(req.body);

users.find({'username': req.body.reciever}, function(err, exist){

	if(exist.length < 1){

res.json( "user doesnt exist" );

      }
			else if (exist.length ==1) {

users.update({'username':req.body.sender }, { $addToSet: { SentFriendRequest:req.body.reciever }});

users.update({'username':req.body.reciever }, { $addToSet: { RecievedFriendRequest:req.body.sender }});

res.json(req.body);
			}
					});

});

//Accept request

app.post('/Accept', function(req, res){
	//Pulling req
		users.update({ 'username': req.body.accepter }, { $pull: { RecievedFriendRequest: req.body.sender }});
		users.update({ 'username':req.body.sender  }, { $pull: { RecievedFriendRequest: req.body.accepter }});

	//Pulling req
	users.update({ 'username': req.body.sender }, { $pull: { SentFriendRequest: req.body.accepter }});
	users.update({ 'username':req.body.accepter  }, { $pull: { SentFriendRequest: req.body.sender }});

					notifications.insert({username:req.body.sender, message:req.body.accepter + 'approved your Request'});

				 Friendsid = Math.round((Math.random() * 1000000000));

				 users.findOne({"username":req.body.sender}, function(err, data){
		 	 Friends.insert({
				  Friend:data.username,
				  Id: Friendsid,
					username: req.body.accepter,
					Name    : data.Name,
					Location: data.Location,
					Sex      :data.Sex,
					country : data.country,
					 likes :"",
					 dislikes :"",
					 status   : data.status,
					 ProfilePhoto:data.ProfilePhoto,
					 photos :data.photos
				});


		 		});


				 Friends.insert({
					 Friend:req.user.username,
					 Id: Friendsid,
					 username  : req.body.sender,
					 Name      : req.user.Name,
					 Location  : req.user.Location,
					 Sex       :req.user.Sex,
					 country   : req.user.country,
						likes    :"",
						dislikes :"",
						status   : req.user.status,
				 ProfilePhoto:req.user.ProfilePhoto,
						photos   :req.user.photos

						});

				 res.json(req.body);
});

app.post('/Ignore', function(req, res){

	//Pulling req
		users.update({ 'username': req.body.accepter }, { $pull: { RecievedFriendRequest: req.body.sender }});
		users.update({ 'username':req.body.sender  }, { $pull: { RecievedFriendRequest: req.body.accepter }});

	//Pulling req
	users.update({ 'username': req.body.sender }, { $pull: { SentFriendRequest: req.body.accepter }});
	users.update({ 'username':req.body.accepter  }, { $pull: { SentFriendRequest: req.body.sender }});

	notifications.insert({username:req.body.sender, message:req.body.accepter + 'Rejected your Request'});

	res.json(req.body);
});

app.post('/Delete', function(req, res){

//delete code
Friends.remove({"Friend":req.body.Delete, "username":req.body.User }, { multi: true }, function (err, numRemoved) {
});
Friends.remove({"Friend":req.body.User, "username":req.body.Delete}, { multi: true }, function (err, numRemoved) {

});
	notifications.insert({username:req.body.Delete, message:req.body.User + 'Deleted you'});

	res.json(req.body);
});


	app.get('/photo', function(req, res){
		// Find all photos
		photos.find({}, function(err, all_photos){

			// Find the current user
			users.find({username: req.user.username}, function(err, u){

				var voted_on = [];

				if(u.length == 1){
					voted_on = u[0].votes;
				}

				var Photo_id=[];

				voted_on.forEach(function(data){
         Photo_id.push(data._id);
				});

				// Find which photos the user hasn't still voted on

				var not_voted_on = all_photos.filter(function(photo){
					return Photo_id.indexOf(photo._id) == -1;
				});
				res.json( not_voted_on );




			});

		});

	});

app.post('/cute', function(req, res){

		photos.findOne({ name: req.body.name }, function(err, found){

			if(found){

				data={
					 Photo : found.name,
					 _id   : found._id,
					 Type  : "likes"
				 }
				photos.update(found, {$inc :{likes:1} });
      users.update({'username':found.username }, { $inc: { likes:1  }});

				users.update({'username':req.body.Username }, { $addToSet: { votes:data }});
					res.json(found);
			//	});

			}
			else{
				res.json('Failed to post');
			}

		});
	});

	app.post('/notcute', function(req, res){
console.log(req.body);
			photos.findOne({ name: req.body.name }, function(err, found){

				if(found){

					data={
						Photo : found.name,
						_id   : found._id,
						Type  : "dislikes"
					}
					photos.update(found, {$inc : {dislikes:1}});

         users.update({'username':found.username }, { $inc: { dislikes:1  }});

				users.update({'username':req.body.Username }, { $addToSet: { votes:data }});
						res.json(req.body);


				}
				else{
					res.json('Failed to post');
				}

			});
		});

		app.get('/Friends', function(req, res){

			Friends.find({}, function(err,data){
		res.send(data);
					});
		});


		app.post('/Like', function(req, res){

			users.find({}, function(err, data){

				res.send(data);
			});

					});

					app.post('/Photos', function(req, res){

						photos.find({}, function(err, data){

							res.send(data);
						});

								});


//Aurthentication routs begines

app.get('/failed', function(req, res){

res.json("Wrong input");
});

function isLoggedIn(req, res, next) {

	 if (req.isAuthenticated())
		return next();

	res.redirect('/failed');
}



app.post('/login', passport.authenticate('local-login', {

	successRedirect : '/send',
	failureRedirect : '/failed',
	failureFlash : true
}));
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/send',
	failureRedirect : '/failed',
	failureFlash : true
}));
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

}
