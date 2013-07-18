'use strict';

/* Controllers */

app.controller('redditCtrl', function($scope, $http, $routeParams, $location) {
    //Container for all displayed images, each array representing one column 
    $scope.pics = [[], [], []];
    //Prevent mutliple loads from triggering at once
    $scope.busy = false;
    //Reddit post ID to request older content
    $scope.after = '';

    //Pick subreddit
    if ($routeParams.subreddit) {
        $scope.source = $routeParams.subreddit;
    }else {
        //Default subreddit is r/pics
        $scope.source = 'pics';
    }
    //Keep track of column heights for balance
    var heights = [0, 0, 0];

    $scope.loadMore = function() {
        if ($scope.busy) return;
        $scope.busy = true;
        var url =  "http://api.reddit.com/r/" + $scope.source + "?after=" + $scope.after + "&limit=25&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
            $scope.after = data.data.after;
            var items = data.data.children;
            for (var i = 0; i < items.length; i++) {
                //Make async request to get URL; async required for sites like Flickr
                getUrl(items[i].data, function(urlpre, urllarge, data) {
                    var column =  heights.indexOf(Math.min.apply(Math, heights));
                    //Temporary solution for height imbalance issue
                    //Probably hinders performance
                    var img = new Image();
                    img.src = urlpre;
                    img.onload = function() {
                        heights[column] += this.height/this.width;
                    }
                    data.urlpre = urlpre;
                    console.log(urllarge);
                    data.urllarge = urllarge;
                    data.comments = 'http://reddit.com' + data.permalink;
                    $scope.pics[column].push(data);
                });
            }
            $scope.busy = false;
        }).
        error(function(data) {
            $scope.busy = false;
        })
    };
    $scope.loadMore();



    function getUrl(data, callback) {
        var flickerApiKey = "df1ff13d7f696d907c3296a5ff656536"; //Please apply for your own key through Flickr :)
        //Regex for ID extraction
        var imgmatch = /img.*\/(.*).jpg$/.exec(data.url);
        var lmematch = /livememe.com\/(.*)/.exec(data.url);
        var flimatch = /flickr.*\/([0-9]{10})\//.exec(data.url);
        if (imgmatch) {
            callback('http://i.imgur.com/' + imgmatch[1] + 'l.jpg', data.url, data);
        }else if (lmematch) {
            callback('http://i.lvme.me/' + lmematch[1] + '.jpg', data.url, data);
        }else if (flimatch) {
            //Perform asynchronous request to obtain Flickr src image URL
            $.ajax({
                type: 'get',
                url: "http://www.flickr.com/services/rest/",
                data: {
                    method: 'flickr.photos.getSizes', 
                    format: 'json',
                    api_key: flickerApiKey,
                    photo_id: flimatch[1], 
                },
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: function(response) {
                    if (response.sizes) {
                        callback(response.sizes.size[5].source, response.sizes.size[8].source, data);
                    }
                }
            });
        }
    }
}); 
