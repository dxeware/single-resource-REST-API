"use strict";

function updateTeams(vm, $http) {
  $http.get( '/collegeteams' ).then(
   function(response) {
     console.log("GET success");
     console.log(response);
     vm.list.teams = response.data;
     vm.newTeam.name = '';
     vm.newTeam.mascot = '';
   },
   function(error) {
     console.log("GET error:", error);
   }
  );
}

CollegeTeamCtrl.$inject = ['$http', 'TeamService'];

function CollegeTeamCtrl($http, TeamService) {
  var vm = this;
  vm.list = {};
  vm.newTeam = {
    _id: '',
    name: '',
    mascot: '',
  };

  updateTeams(vm, $http);

  vm.addTeam = function(newTeam) {
    vm.newTeam = newTeam;

    TeamService.addTeam(vm.newTeam)
      .then(function(response) {
        console.log("POST success");
        console.log(response);
        updateTeams(vm, $http);
      })
      .catch(function(error) {
        console.log("POST error:", error);
      });
  };

  vm.updateTeam = function(team) {
    TeamService.updateTeam(team)
      .then(function(response) {
        console.log("UPDATE success");
        console.log(response);
        updateTeams(vm, $http);
      })
      .catch(function(error) {
        console.log("UPDATE error:", error);
      });
  };

  vm.deleteTeam = function(id) {
    TeamService.deleteTeam(id)
      .then(function(response) {
        console.log("DELETE success");
        console.log(response);
        updateTeams(vm, $http);
      })
      .catch(function(error) {
        console.log("DELETE error:", error);
      });
  };
}

angular.module('teamApp')
        .config(config)
        .controller( 'CollegeTeamCtrl', CollegeTeamCtrl );
