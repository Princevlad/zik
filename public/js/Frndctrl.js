ChatApp.controller('Frndctrl', function($scope, $location, $localStorage, socket, $window, $routeParams, $http) {
var FRequest=[];
var FList =[];

//Send Friend Request
  $scope.AddFriend = function(username) {
 socket.emit('AddFriend',username )
  $scope.AddFriend = {};
    };

    $scope.Push=function(){
      socket.emit("test", "oboi");
      console.log("free spirit");

     socket.on('returnTest', function(data){
       console.log("came");
       console.log(data);
     });

  };

//Accept Request
    $scope.Accept= function(request){
    console.log(request);
          socket.emit("Accept", request);

       };

       $scope.Ignore= function(Request){
         console.log(Request);
             socket.emit("Ignore", Request);
          };

          $scope.Delete= function(){
            console.log(msg);
                 socket.emit("Delete", msg);
             };

    socket.on('ReqStatus', function(data){
        Alert(data);
    });

    socket.on('Notification', function(data){
        console.log(data);


    });

    socket.on('RecievedFriendRequest', function(data){
      angular.forEach(data, function(data){
        FRequest.push(data);
      })
        console.log(FRequest);
$scope.FRequest=FRequest;

    });


     socket.on('FriendsList', function(data){
      angular.forEach(data, function(data){
       console.log(data);
 FList.push(data);
$scope.List=FList;
})
     });


})
