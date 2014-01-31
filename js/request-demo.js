;(function( $ ){
  'use strict';

  $.fn.requestDemo = function( options ){
    var $this = this, $body = $( document.body );

    var defaults = {
      targetSelector:       '#contact-section'
    , textReplaceSelector:  '#message'
    , defaultText:          'I would like a demo'
    , focusSelector:        '#name-1'
    };

    options = $.extend( {}, defaults, options );

    var $target = $( options.targetSelector );

    $this.click( function( e ){
      // We really don't want to have to deal with URL state
      e.preventDefault();

      plugin.replaceTargetText();
      plugin.scrollToTarget();
    });

    var plugin = {
      scrollToTarget: function(){
        $body.animate({
          scrollTop: $target.offset().top
        });
      }

    , replaceTargetText: function(){
        $target.find( options.textReplaceSelector ).val( options.defaultText );
        $target.find( options.focusSelector ).focus();
      }
    };

    return plugin;
  };

})( jQuery );