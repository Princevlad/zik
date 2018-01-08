ChatApp.controller('Chatctrl', function($scope, $rootScope, $localStorage, socket, $stateParams, $http) {
//Globals
var user= $stateParams.Id;
var convo=[];
var tmpconvo=[];


var Showmsg=function(){
  MessageToShow=[];

/*  angular.forEach($localStorage.convo, function(data){
  convo.push(data);
})*/
    angular.forEach(convo, function(data){
      if(data.Id==user){
        if(data.sender==$localStorage.Username){
        var  MsgData={
            messageHome : data.message,
            IdHome     : data.Id,
            senderHome : data.sender,
            msgstatusHome : data.msgstatus
          }
          MessageToShow.push(MsgData);
        }else {
          MessageToShow.push(data);
           }
        }
    });
          $scope.List=MessageToShow;
}

$scope.IsTyping= function(){
  console.log("is typing a message");
}

$scope.sendMessage=  function(message){
var messageData={
  message : message,
  Id     : user,
  sender : $localStorage.Username,
  msgstatus : "sending"
/*  color     :
  Time      :
  */
}
convo.push(messageData);
tmpconvo.push(messageData);
//save
$localStorage.tmpconvo=tmpconvo;
//$localStorage.convo=convo;
//log
//send to server
  socket.emit("Newconvo", messageData);
$scope.message= "";
};

socket.on('Delete_convo', function(data){
  tmpconvo.splice(tmpconvo.indexOf(data),1);
  convo.splice(convo.indexOf(data),1);
  $localStorage.tmpconvo=tmpconvo;
//console.log($localStorage.tmpconvo);
//console.log($localStorage.convo);
});

socket.on('New_convo', function(data){
  angular.forEach(data, function(data){
    convo.push(data);
    //Save to sqlite
  });
 //$localStorage.convo=convo;

  //convo display function
 Showmsg();
});

if($rootScope.Online==true){
  angular.forEach($localStorage.tmpconvo, function(data){
    socket.emit("Newconvo", data);
      });

    socket.emit("give", "localStorage");

  }else if ($rootScope.Online!==true) {
//query

  //display function
//  Showmsg();

}

socket.on('pending', function(data){
//  console.log( data);
  //socket.emit("Newconvo", $localStorage.tmpconvo);
  angular.forEach(data, function(data){
    convo.push(data);
      Showmsg();
  })
//  console.log(convo);
//  $localStorage.convo=convo;
  Showmsg();
});

});
