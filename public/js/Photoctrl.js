ChatApp.controller('Photoctrl', function($scope, $rootScope, $http, $localStorage) {


showphoto=[];

  $http.get('http://localhost:8080/photo')
    .success(function(photos) {
      console.log(photos);
       angular.forEach(photos, function(data){
         showphoto.push(data);
       });
        $scope.images=showphoto;
        console.log(showphoto);
})
.error(function(data) {
   console.log('Failed  ');
 });

 $scope.cute= function(x){

   photo={
     dislikes:x.dislikes,
     likes   :x.likes,
     name    :x.name,
     username:$localStorage.Username
   }
   console.log(photo);
   $http.post('http://localhost:8080/cute', photo)
     .success(function(photo) {
       console.log(photo);
showphoto.splice(showphoto.indexOf(photo),1);
$scope.images=showphoto;
console.log(showphoto);
 })
 .error(function(data) {
    console.log('Failed  ');
  });
 }

 $scope.notcute= function(x){
   photo={
     dislikes:x.dislikes,
     likes   :x.likes,
     name    :x.name,
     username:$localStorage.Username
   }
   console.log(photo);
   $http.post('http://localhost:8080/notcute', photo)
     .success(function(photo) {

       showphoto.splice(showphoto.indexOf(photo),1);
       $scope.images=showphoto;
       console.log(showphoto);
 })
 .error(function(data) {
    console.log('Failed  ');
  });
 }

})
