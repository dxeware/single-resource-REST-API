'use strict';

describe('collegeTeams module', function() {

  var vm, scope;

  beforeEach(module('teamApp'));
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    vm = $controller('CollegeTeamCtrl', {
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

    expect(vm.list.teams).toBeDefined();
    expect(vm.list.teams[0].name).toBe('Virginia');

    // Ensure test is run
    $httpBackend.verifyNoOutstandingRequest();
  }));
  
});