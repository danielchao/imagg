'use strict';

/* Controllers */


function redditCtrl ($scope, $http, $routeParams, $location) {
    $scope.pics = [[], [], []];
    $scope.busy = false;
    if ($routeParams.subreddit) {
        $scope.source = $routeParams.subreddit;
    }else {
        $scope.source = 'pics';
    }

    var column1 = angular.element('.span4:first-child');
    var column2 = angular.element('.span4:nth-child(2)');
    var column3 = angular.element('.span4:nth-child(3)');
    $scope.after = '';

    $scope.loadMore = function() {
        if ($scope.busy) return;
        $scope.busy = true;
        var url =  "http://api.reddit.com/r/" + $scope.source + "?after=" + $scope.after + "&limit=25&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
            $scope.after = data.data.after;
            var items = data.data.children;
            var heights = [column1[0].offsetHeight, 
                            column2[0].offsetHeight, 
                            column3[0].offsetHeight];
            var column =  heights.indexOf(Math.min.apply(Math, heights));
            var regex = /imgur.*\/(.*).jpg$/;
            for (var i = 0; i < items.length; i++) {
                var match = regex.exec(items[i].data.url);
                if (match) {
                    column++;
                    var urlpre = "http://i.imgur.com/" + match[1] + 'l.jpg';
                    items[i].data.urlpre = urlpre;
                    items[i].data.comments = 'http://reddit.com' + items[i].data.permalink;
                    $scope.pics[column%3].push(items[i].data);
                    console.log(items[i].data);
                }
            }
            $scope.busy = false;
        }).
        error(function(data) {
            $scope.busy = false;
        })

    };
    $scope.loadMore();

} 
