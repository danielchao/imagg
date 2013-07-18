'use strict';

/* Directives */

app.directive('hovershow', function() {
        return {
            restrict: 'A',
            link : function(scope, element, attrs) {
                element.bind('mouseenter', function() {
                    element.children('div').fadeIn();
                });
                element.bind('mouseleave', function() {
                    element.children('div').fadeOut();
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
                console.log('here');
                img.attr('src', attrs.alt);
                img.css('max-height', $(window).height() * 0.8);
                img.modal('toggle');
            });
        }
    };
});

