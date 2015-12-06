"use strict";

//config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/home'});
// }]);

config.$inject = ['$routeProvider'];

function config($routeProvider) {

  $routeProvider.when('/', {
    templateUrl : 'home/home.html',
    controller : 'HomePageCtrl',
  }).when('/home', {
    templateUrl : 'home/home.html',
    controller : 'HomePageCtrl',
  }).when('/teams', {
    templateUrl: 'teams/teams.html',
    controller: 'CollegeTeamCtrl'
  // }).when('/error', {
  //   templateUrl : 'home/home.html',
  //   controller : 'HomePageCtrl',
  })
  .otherwise({redirectTo: '/home'});

}
