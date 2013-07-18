'use strict';

/* Controllers */

app.controller('redditCtrl', function($scope, $http, $routeParams, $location) {
    $scope.pics = [[], [], []];
    $scope.busy = false;
    if ($routeParams.subreddit) {
        $scope.source = $routeParams.subreddit;
    }else {
        $scope.source = 'pics';
    }
    var lengths = [0, 0, 0];
    //var column1 = angular.element('.span4:first-child');
    //var column2 = angular.element('.span4:nth-child(2)');
    //var column3 = angular.element('.span4:nth-child(3)');
    $scope.after = '';
    $scope.loadMore = function() {
        if ($scope.busy) return;
        $scope.busy = true;
        var url =  "http://api.reddit.com/r/" + $scope.source + "?after=" + $scope.after + "&limit=25&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
            $scope.after = data.data.after;
            var items = data.data.children;
            var regex = /imgur.*\/(.*).jpg$/;
            for (var i = 0; i < items.length; i++) {
                var match = regex.exec(items[i].data.url);
                if (match) {
                    var column =  lengths.indexOf(Math.min.apply(Math, lengths));
                    var urlpre = "http://i.imgur.com/" + match[1] + 'l.jpg';
                    var img = new Image();
                    img.src = urlpre;
                    img.onload = function() {
                        lengths[column] += this.height/this.width;
                    }
                    items[i].data.urlpre = urlpre;
                    items[i].data.comments = 'http://reddit.com' + items[i].data.permalink;
                    $scope.pics[column].push(items[i].data);
                }
            }
            $scope.busy = false;
        }).
        error(function(data) {
            $scope.busy = false;
        })
    };
    $scope.loadMore();
}); 
