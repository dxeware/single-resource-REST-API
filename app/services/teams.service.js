"use strict";

angular.module('teamApp')
  .constant('TEAM_ROUTE', '/collegeteams')
  .factory('TeamService', TeamService);

function TeamService($http, TEAM_ROUTE) {
  return {
    addTeam: function(newTeam) {
      return $http.post(TEAM_ROUTE, newTeam);
    },

    updateTeam: function(team) {
      return $http.put(TEAM_ROUTE+'/'+team._id, team);
    },

    deleteTeam: function(id) {
      return $http.delete(TEAM_ROUTE+'/'+id);
    }
  };
}
