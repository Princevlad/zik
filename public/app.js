
var ChatApp= angular.module('ChatApp', ["ngRoute", "ngStorage"]);

ChatApp.config(['$routeProvider',  function ($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'views/login.html',
            controller: 'Authctrl'
        }).
        when('/signup', {
            templateUrl: 'views/Signup.html',
            controller: 'Authctrl'
        }).
        when('/send', {
            templateUrl: 'views/Page1.html',
            controller: 'Frndctrl'
        }).
        when('/photos', {
            templateUrl: 'views/Page2.html',
            controller: 'Photoctrl'
        }).
        when('/Chat/:Chat_id', {
            templateUrl: 'views/chatpage.html',
            controller: 'Chatctrl'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);

  ChatApp.factory('socket', ['$rootScope' ,function ($rootScope) {
    var socket=io.connect();
    $rootScope.Online=true;
    console.log($rootScope.Online);
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  }]);
