'use strict';

/* Controllers */

app.controller('redditCtrl', function($scope, $http, $routeParams, $location) {
    //Container for all displayed images, each array representing one column 
    $scope.pics = [];
    //Prevent mutliple loads from triggering at once
    $scope.busy = false;
    //Reddit post ID to request older content
    $scope.after = '';
    //Pick subreddit
    if ($routeParams.subreddit) {
        $scope.source = 'r/' + $routeParams.subreddit;
    }else {
        $scope.source = 'r/pics';
    }

    $scope.loadMore = function() {
        if ($scope.busy) return;
        $scope.busy = true;
        //var url =  "http://api.reddit.com/r/" + $scope.source + "?after=" + $scope.after + "&limit=25&jsonp=JSON_CALLBACK";
        var url =  "http://api.reddit.com/" + $scope.source + "?after=" + $scope.after + "&limit=10&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
            $scope.after = data.data.after;
            var items = data.data.children;
            for (var i = 0; i < items.length; i++) {
                //Make async request to get img src URL
                getUrl(items[i].data, function(urlpre, urllarge, data) {
                    data.urlpre = urlpre;
                    data.urllarge = urllarge;
                    data.comments = 'http://reddit.com' + data.permalink;
                    if (data.title.length > 100) {
                        data.title = data.title.substring(0, 100) + "...";
                    }
                    $scope.pics.push(data);
                });
            }
            $scope.busy = false;
        }).
        error(function(data) {
            $scope.busy = false;
        })
    };
    $scope.loadMore();
}); 

function getUrl(data, callback) {
    var flickerApiKey = "df1ff13d7f696d907c3296a5ff656536"; //Please apply for your own key through Flickr :)
    var imgurClientId = "6579e7f1ba57ad6" //Likewise ^ 
    //Regex for ID extraction
    var imgmatch1 = /imgur.*\/(.*).(jpg|png)$/.exec(data.url);
    //imgur albums
    var imgmatch2 = /imgur.*a\/(.*)$/.exec(data.url);
    // Imgur with no filetype extension
    var imgmatch3 = /imgur.*\/(.*)$/.exec(data.url);
    //livememe
    var lmematch = /livememe.com\/(.*)/.exec(data.url);
    //flickr
    var flimatch = /flickr.*\/([0-9]{10})\//.exec(data.url);
    if (imgmatch2) {
        $.ajax({
            type: 'get',
            url: "https://api.imgur.com/3/album/" + imgmatch2[1],
            headers: {
                "Authorization": 'Client-ID ' + imgurClientId
            },
            success: function(response) {
                var link = response.data.images[0].link;
                var imgmatch = /imgur.*\/(.*).jpg$/.exec(link);
                if (imgmatch) {
                    callback('http://i.imgur.com/' + imgmatch[1] + 'l.jpg', link, data);
                }
            }
        });
    }else if (imgmatch1) {
        callback('http://i.imgur.com/' + imgmatch1[1] + 'l.jpg', data.url, data);
    }else if (imgmatch3) {
        callback('http://i.imgur.com/' + imgmatch3[1] + 'l.jpg', 'http://i.imgur.com/' + imgmatch3[1] + '.jpg', data);
    }else if (lmematch) {
        var url = 'http://i.lvme.me/' + lmematch[1] + '.jpg';
        callback(url, url, data);
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
    }else {
        //console.log("did not include " + data.url);
        console.log("");
    }
}
