
var db = require('./database'),
	messages = db.messages,
	users = db.users,
	Friends = db.Friends,
	notifications=db.notifications;





module.exports = function(client){


	client.on('connection', function (socket) {
console.log("connected");


//New data's
socket.on('give', function(data){



  socket.join(data.username);
	socket.join(100000);
	//messages
	messages.find({"Reciever": data.username}, function(err, data){

		data.forEach(function(Newdata){

   socket.emit("New_convo", Newdata);
      });

	});

	messages.find({"Id": 100000, 'sender':"Prince"}, function(err, data){

		data.forEach(function(Newdata){

	 socket.emit("New_convo", Newdata);
			});

	});


  //New friends
	Friends.find({'username':data.username}, function(err, data){

		data.forEach(function(data){
		socket.join(data.Id);
	    	});
				console.log(data);
				socket.emit("Friend", data);

});




           });


socket.on('Remove', function(data){
	messages.remove({'Mid':data.Mid},{ multi: true }, function (err, Msgremoved) {

console.log(Msgremoved);
      });
});


	//Add Friend

   	socket.on('Newreq', function(data){

		client.to(data.reciever).emit('Notification', data.sender + "sent you a Request");

		client.to(data.reciever).emit("RecievedFriendRequest", data.sender);

	  	});
                   // Accept Friend Request

			socket.on('NewAcc', function(data){
client.to(data.sender).emit('Notification', data.accepter + "approved your  Request");
client.to(data.sender).emit('FriendsList', data.accepter);

		       	});

                   //Ignore Request
						socket.on('NewRej', function(data){
			client.to(data.sender).emit('Notification', data.accepter + "Rejected your  Request");
			client.to(data.sender).emit('Close', data.accepter);

									});

					 // New Delete function
									socket.on('NewDel', function(data){
						client.to(data.Delete).emit('Notification', data.accepter + "Deleted your ");
						client.to(data.Delete).emit('Del', data.User);

												});


												////////////////////////////////////////
										    // Message Routes Start
										    ////////////////////////////////////////

      socket.on('Newconvo', function(data){
console.log(data.Time);
				messages.insert({
				message : data.message,
				Id     : data.Id,
				sender : data.sender,
				Mid    :data.Mid,
				Reciever:data.Reciever,
				msgstatus : "sent",
				  Time     :data.Time
			});

		client.to(data.sender).emit('Delete_convo', data);

								messages.findOne({'Id': data.Id, 'Mid':data.Mid}, function(err, data){

							client.to(data.Id).emit("New_convo", data);

							});
			});

			socket.on('Typing', function(data){
	client.to(data.Reciever).emit("Typing", data);

			});


});    //socket clossing

};
