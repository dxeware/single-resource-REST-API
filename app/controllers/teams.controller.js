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

var collegeTeams = angular.module('collegeTeams', []);

collegeTeams.controller('CollegeTeamCtrl', ['$scope', '$http', CollegeTeamCtrl]);

function CollegeTeamCtrl($scope, $http) {
  $scope.list = {};
  $scope.newTeam = {
    _id: '',
    name: '',
    mascot: '',
  };

  console.log('CollegeTeamCtrl.....');

  /*$http.get( '/collegeteams' ).then(
      function(response) {
        console.log("POST success");
        console.log(response);
        $scope.list.teams = response.data;
      },
      function(error) {
        console.log("POST error");
      }
    );
*/
  updateTeams($scope, $http);

  $scope.addTeam = function( newTeam ) {
    console.log('newTeam button pressed');

    $scope.newTeam = newTeam;
    console.log('newTeam = ' + newTeam.name + ',' + newTeam.mascot);

    $http.post( '/collegeteams', $scope.newTeam ).then(
      function(response) {
        console.log("POST success");
        console.log(response);
        updateTeams($scope, $http);
      },
      function(error) {
        console.log("POST error");
      }
    );
  };

  $scope.updateTeam = function( team ) {
    console.log('delete button pressed: ' + team._id);

    $http.put( '/collegeteams/' + team._id, team ).then(
      function(response) {
        console.log("UPDATE success");
        console.log(response);
        updateTeams($scope, $http);
      },
      function(error) {
        console.log("UPDATE error");
      }
    );
  };

  $scope.deleteTeam = function( id ) {
    console.log('delete button pressed: ' + id);

    $http.delete( '/collegeteams/' + id, id ).then(
      function(response) {
        console.log("DELETE success");
        console.log(response);
        updateTeams($scope, $http);
      },
      function(error) {
        console.log("DELETE error");
      }
    );
  };
}