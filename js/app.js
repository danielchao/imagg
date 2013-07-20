'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('Imagg', ['infinite-scroll']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/images.html',   controller: 'redditCtrl'}).
      when('/r/:subreddit', {templateUrl: 'partials/images.html', controller: 'redditCtrl'}).
      when('/about', {templateUrl: 'partials/about.html'}).
      when('/mobile', {templateUrl: 'partials/mobile_images.html', controller: 'redditCtrl'}).
      when('/mobile/r/:subreddit', {templateUrl: 'partials/mobile_images.html', controller: 'redditCtrl'}).
      otherwise({redirectTo: '/'});
    }]);
