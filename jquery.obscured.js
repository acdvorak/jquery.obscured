(function( $, undefined ) {

    $.extend ( $.expr[':'], {

        obscured: function ( obj ) {
            var $obj = $( obj );
            var $parent = $obj.offsetParent();

            var isHidden = $obj.is(':hidden');

            if( isHidden ) $obj.show();

            var selfOffset = $obj.offset();

            var selfRect = {
                top: selfOffset.top,
                left: selfOffset.left,
                right: selfOffset.left + $obj.outerWidth(),
                bottom: selfOffset.top + $obj.outerHeight()
            };

            var parentRect = {
                top: $parent.scrollTop(),
                left: $parent.scrollLeft(),
                right: $parent.scrollLeft() + $parent.width(),
                bottom: $parent.scrollTop() + $parent.height()
            };

            var fullyVisible =  selfRect.top >= parentRect.top
                && selfRect.left >= parentRect.left
                && selfRect.right <= parentRect.right
                && selfRect.bottom <= parentRect.bottom;

            if( isHidden ) $obj.hide();

            return ! fullyVisible;
        }

    } );

})( jQuery );