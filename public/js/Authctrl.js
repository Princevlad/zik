ChatApp.controller('Authctrl', function($scope, $location, $localStorage, $http) {

/*if($localStorage.Username.length >0 ){
  console.log("i'm a bad guy");
    $location.path('/send')
    console.log($localStorage.Username);
} */



$scope.login= function() {

 var test = $scope.formData.email;
  $http.post('http://localhost:8080/login', $scope.formData)
    .success(function(msg) {
      console.log(msg);
      $scope.formData = {};

              //  $localStorage.user =msg;
               console.log(test);
              if(msg == test){
                console.log('changed location');
                $localStorage.Username=msg;
                $location.path('/send')
              }else{
              alert("wrong input");
              }
})
.error(function(data) {
   console.log('Failed to login ');
 });
}

$scope.Signup= function() {

 var test = $scope.formData.username;
  $http.post('http://localhost:8080/signup', $scope.formData)
    .success(function(msg) {
      console.log(msg);
      $scope.formData = {};

              //  $localStorage.user =msg;
               console.log(test);
              if(msg == test){
                console.log('changed location');
                $location.path('/send')
              }else{
              alert("User already exist");
              }



})
.error(function(data) {
   console.log('Failed to login ');
 });
}

})
