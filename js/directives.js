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
                var prev = $('#preview');
                if (prev.html() == "") {
                    prev.html("<img src='" + attrs.alt + "'></img>");
                    prev.fadeToggle();
                    $('#preview img').css('max-height', $(window).height() * 0.8);
                    prev.modal('toggle');
                }
            });
        }
    };
});
app.directive('exitonclick', function() {
    return {
        restrict: 'A',
        link : function(scope, element, attrs) {
            element.bind('click', function() {
                var prev = $('#preview');
                prev.fadeToggle();
                prev.html("");
                prev.modal('toggle');
            });
        }
    };
});
