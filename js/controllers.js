'use strict';

/* Controllers */

angular.module('Imagg', ['ngResource']); 

function redditCtrl($scope, $http) {

    function getPics(source) {
        var reddit = $http.jsonp('http://reddit.com/r/' + source + '.json?jsonp=JSON_CALLBACK');
        reddit.success(function(result) {
            var imgData = result.data.children;
            $scope.pics = [[], [], []];
            var j = 0;
            for (var i = 0; i < imgData.length; i++) {
                var regex = /imgur.*\/(.*).jpg$/;
                var match = regex.exec(imgData[i].data.url);
                if (match){
                    var title = imgData[i].data.title;
                    var comments = 'http://reddit.com' + imgData[i].data.permalink;
                    var urlpre = "http://i.imgur.com/" + match[1] + 'l.jpg';
                    var urlsrc = "http://i.imgur.com/" + match[1] + '.jpg';
                    $scope.pics[(j+3)%3].push({urlpre: urlpre, 
                        urlsrc: urlsrc, 
                        title: title,
                        comments: comments
                    });
                    j++;
                }
            }
        });
    }
    getPics('pics');


    $scope.changeSubreddit = function(){
        console.log("here");
        getPics($scope.subreddit);
    }

}
