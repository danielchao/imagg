'use strict';

/* Directives */

module.directive('hovershow', function() {
        return {
            link : function(scope, element, attrs) {
                element.bind('mouseenter', function() {
                    element.next().fadeIn();
                });
                element.bind('mouseleave', function() {
                    element.next().fadeOut();
                });
            }
        };
    }
);
