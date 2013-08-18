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
            element.bind('load', function() {
                var h1 = $('#column-1').height();
                var h2 = $('#column-2').height();
                var h3 = $('#column-3').height();
                if (h2 <= h1 && h2 <= h3) {
                    element.parent().appendTo($('#column-2'));
                }else if (h3 <= h1 && h3 <= h2) {
                    element.parent().appendTo($('#column-3'));
                }else {
                    element.parent().appendTo($('#column-1'));
                }
                element.parent().fadeIn();
            });
            element.bind('click', function() {
                var img = $('#preview');
                img.attr('src', attrs.alt);
                img.css('max-height', $(window).height() * 0.8);
                img.modal('toggle');
            });
        }
    };
});

