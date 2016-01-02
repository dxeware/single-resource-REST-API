'use strict';

describe('homePage module', function() {

  beforeEach(module('teamApp'));
  beforeEach(inject(function($controller, $rootScope){
    console.log("===========================");
    console.log("=====home.Spec.js====");
    console.log("===========================");
    console.log('\n');
  }));

  describe('homePage controller', function(){
    it('should check the greeting messages....', inject(function($rootScope, $controller) {
      var scope = $rootScope.$new();
      var homeCtrl = $controller('HomePageCtrl', {$scope: scope});
      expect(scope.greeting.messages[0]).toEqual('Welcome to College Football Teams App!');
      expect(scope.greeting.messages[1]).toEqual('Visit the Team page to enter your favorite teams.');
    }));
  });

});