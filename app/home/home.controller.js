"use strict";

HomePageCtrl.$inject = ['$scope'];

function HomePageCtrl($scope) {
  $scope.greeting = {};
  $scope.greeting.messages = [
    'Welcome to College Football Teams App!',
    'Visit the Team page to enter your favorite teams.'
  ];

}

angular.module('teamApp')
        .config(config)
        .controller( 'HomePageCtrl', HomePageCtrl );

// var homePage = angular.module('homePage', ['ngRoute']);

// homePage.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/home', {
//     templateUrl: 'home/home.html',
//     controller: 'HomePageCtrl'
//   });
// }]);

// homePage.controller('HomePageCtrl', ['$scope', HomePageCtrl]);