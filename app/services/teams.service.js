"use strict";

angular.module('teamApp')
  .constant('TEAM_ROUTE', '/collegeteams')
  .service('TeamService', TeamService);

function TeamService($http, TEAM_ROUTE) {
    this.addTeam = function(newTeam) {
        return $http.post(TEAM_ROUTE, newTeam);
    };

    this.updateTeam = function(team) {
        return $http.put(TEAM_ROUTE+'/'+team._id, team);
    };

    this.deleteTeam = function(id) {
        return $http.delete(TEAM_ROUTE+'/'+id);
    };
    
}
