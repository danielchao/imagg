'use strict';

/* Directives */

app.directive('hovershow', function() {
        return {
            restrict: 'A',
            link : function(scope, element, attrs) {
                element.bind('mouseenter', function() {
                    element.children('div').fadeIn(200);
                });
                element.bind('mouseleave', function() {
                    element.children('div').fadeOut(50);
                });
            }
        };
    }
);
app.directive('clickpreview', function() {
    return {
        restrict: 'A',
        link : function(scope, element, attrs) {
            element.bind('click', function() {
                var img = $('#preview');
                img.attr('src', attrs.alt);
                img.css('max-height', $(window).height() * 0.8);
                img.modal('toggle');
            });
        }
    };
});
app.directive('logout', function() {
    return {
        restrict: 'A',
        link : function(scope, element, attrs) {
            element.bind('click', function() {
                helper.disconnect();
            });
        }
    };
});
app.directive('favorite', function() {
    return {
        restrict: 'A',
        link : function(scope, element, attrs) {
            element.bind('click', function() {
                var par = element.parent().serializeArray();
                var image = scope.pics[par[1].value-1][par[0].value];
                $.post('process.php', image, function(data) {
                    console.log(data);
                }, 'json');
                //element.parent().submit();
            });
        }
    };
});
