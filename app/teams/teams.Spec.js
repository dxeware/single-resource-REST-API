'use strict';

describe('collegeTeams module', function() {

  var teamCtrl, scope;

  beforeEach(module('collegeTeams'));
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    teamCtrl = $controller('CollegeTeamCtrl', {
      $scope: scope
    });
  }));
  
  it('should update team list on GET request', inject(function($rootScope, $httpBackend, $controller) {

    var response = [
      {
        name: 'Virginia',
        mascot: 'Cavalier'
      }
    ];

    $httpBackend.expect('GET', '/collegeteams')
      .respond(response);

    // Trigger Angular's digest cycle
    $rootScope.$digest();

    // Ensure that the HTTP mock code is applied
    $httpBackend.flush();

    expect(scope.list.teams).toBeDefined();
    expect(scope.list.teams[0].name).toBe('Virginia');

    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
  }));
  
});