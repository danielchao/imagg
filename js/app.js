'use strict';


// Declare app level module which depends on filters, and services
angular.module('Imagg', ['Imagg.filters', 'Imagg.services', 'Imagg.directives', 'Imagg.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/images.html', controller: 'dummy'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
