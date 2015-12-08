"use strict";

function updateTeams($scope, $http) {
  $http.get( '/collegeteams' ).then(
   function(response) {
     console.log("GET success");
     console.log(response);
     $scope.list.teams = response.data;
     $scope.newTeam.name = '';
     $scope.newTeam.mascot = '';
   },
   function(error) {
     console.log("GET error");
   }
  );
}

CollegeTeamCtrl.$inject = ['$scope', '$http', 'TeamService'];

function CollegeTeamCtrl($scope, $http, TeamService) {
  $scope.list = {};
  $scope.newTeam = {
    _id: '',
    name: '',
    mascot: '',
  };

  updateTeams($scope, $http);

  $scope.addTeam = function(newTeam) {
    $scope.newTeam = newTeam;

    TeamService.addTeam($scope.newTeam)
      .then(function(response) {
        console.log("POST success");
        console.log(response);
        updateTeams($scope, $http);
      })
      .catch(function(error) {
        console.log("POST error");
      });
  };

  $scope.updateTeam = function(team) {
    TeamService.updateTeam(team)
      .then(function(response) {
        console.log("UPDATE success");
        console.log(response);
        updateTeams($scope, $http);
      })
      .catch(function(error) {
        console.log("UPDATE error");
      });
  };

  $scope.deleteTeam = function(id) {
    TeamService.deleteTeam(id)
      .then(function(response) {
        console.log("DELETE success");
        console.log(response);
        updateTeams($scope, $http);
      })
      .catch(function(error) {
        console.log("DELETE error");
      });
  };
}

// var collegeTeams = angular.module('collegeTeams', ['ngRoute']);

// collegeTeams.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/teams', {
//     templateUrl: 'teams/teams.html',
//     controller: 'CollegeTeamCtrl'
//   });
// }]);

// collegeTeams.controller('CollegeTeamCtrl', ['$scope', '$http', CollegeTeamCtrl]);

angular.module('teamApp')
        .config(config)
        .controller( 'CollegeTeamCtrl', CollegeTeamCtrl );
