'use strict';


// Declare app level module which depends on filters, and services
var module = angular.module('Imagg', ['infinite-scroll']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/images.html',   controller: redditCtrl}).
      when('/:subreddit', {templateUrl: 'partials/images.html', controller: redditCtrl}).
      otherwise({redirectTo: '/'});
    }]);
