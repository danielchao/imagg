'use strict';

/* Controllers */

angular.module('Imagg', ['ngResource', 'infinite-scroll']); 

function redditCtrl($scope, $http) {
    $scope.pics = [[], [], []];
    $scope.busy = false;
    $scope.after = '';
    $scope.source = 'pics';
    $scope.loadMore = function() {
        if ($scope.busy) return;
        $scope.busy = true;
        var url =  "http://api.reddit.com/r/" + $scope.source + "?after=" + $scope.after + "&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
            var items = data.data.children;
            var j = 0;
            var last = '';
            var regex = /imgur.*\/(.*).jpg$/;
            for (var i = 0; i < items.length; i++) {
                var match = regex.exec(items[i].data.url);
                if (match) {
                    var urlpre = "http://i.imgur.com/" + match[1] + 'l.jpg';
                    items[i].data.urlpre = urlpre;
                    items[i].data.comments = 'http://reddit.com' + items[i].data.permalink;
                    $scope.pics[j%3].push(items[i].data);
                    last = items[i].data;
                    j++;
                }
            }
            $scope.after = "t3_" + last.id;
            $scope.busy = false;
        });
    };
    $scope.loadMore();

    $scope.changeSubreddit = function(){
        $scope.pics = [[], [], []];
        $scope.after = '';
        $scope.source = $scope.subreddit;
        $scope.loadMore();
    }

}
