/*!
 * jQuery obscured
 *  Copyright 2012, Andrew C. Dvorak
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: https://github.com/acdvorak/jquery.obscured
 */
(function( $, undefined ) {

    var Rect = function(left, top, width, height) {
        if( ! ( this instanceof Rect ) ) {
            return new Rect(left, top, width, height);
        }

        this.left = left;
        this.top = top;
        this.right = left + width;
        this.bottom = top + height;

        this.width = width;
        this.height = height;
    };

    Rect.prototype.contains = function(otherRect) {
        return this.left <= otherRect.left
            && this.top <= otherRect.top
            && this.right >= otherRect.right
            && this.bottom >= otherRect.bottom;
    };

    $.extend ( $.expr[':'], {

        obscured: function ( obj ) {
            var $obj = $(obj);
            var $parent = $obj.offsetParent();
            var $window = $(window);

            var isHidden = $obj.is(':hidden');

            if( isHidden ) $obj.show();

            var objOffset = $obj.offset();

            var objRect = new Rect(objOffset.left, objOffset.top, $obj.outerWidth(), $obj.outerHeight());
            var parentRect = new Rect($parent.scrollLeft(), $parent.scrollTop(), $parent.width(), $parent.height());
            var windowRect = new Rect($window.scrollLeft(), $window.scrollTop(), $window.width(), $window.height());

            if( isHidden ) $obj.hide();

            var parentContains = parentRect.contains(objRect);
            var windowContains = windowRect.contains(objRect);

            return ! ( parentContains && windowContains );
        }

    } );

})( jQuery );