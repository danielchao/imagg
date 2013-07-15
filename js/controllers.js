'use strict';

/* Controllers */

angular.module('myApp', ['ngResource']); 

function TwitterCtrl($scope, $resource) {
    $scope.reddit = $resource('http://reddit.com/search.json', 
            {jsonp: 'JSON_CALLBACK', q: "angular"},
            {get: {method:'JSONP'} });
    $scope.doSearch = function() {
        $scope.redditResult = $scope.reddit.get({q: $scope.searchTerm});
    }
}
