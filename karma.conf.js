module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-route.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-mocks.js',
      'app/app.module.js',
      'app/app.config.js',
      'app/services/teams.service.js',
      'app/home/*.js',
      'app/teams/*.js',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

  });
};
