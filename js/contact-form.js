;(function( $ ){
  'use strict';

  $.fn.contactForm = function( options ){
    var $this = this;

    var defaults = {
      url: '/contact2.php'
    , successSelector: '.contact-header'
    , successText: 'Thanks!<br />We\'ll be in touch'
    , successTextDuration: 5000
    , regexEmail: /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/
    , validators: {
        email: function( val ){
          return options.regexEmail.test( val );
        }

      , first_name: function( val ){
          return true;
        }

      , last_name: function( val ){
          return true;
        }

      , message: function( val ){
          return typeof val === 'string' && val.length > 0;
        }
      }
    };

    options = $.extend( {}, defaults, options );

    var plugin = {
      init: function(){
        $this.submit( function( e ){
          e.preventDefault();

          plugin.postFormData( function( error ){
            if ( error ) return plugin.displayError( error );

            plugin.clearForm();
            plugin.displaySuccess();
          });
        });
      }

    , postFormData: function( data, callback ){
        if ( typeof data === 'function' ){
          callback = data;
          data = null;
        }

        data = data || plugin.getFormData();

        var errors = plugin.validate( data );
        if ( errors.length ) return plugin.displayValidationErrors( errors );

        $.ajax({
          type:     'POST'
        , url:      options.url
        , data:     data
        , success:  function(){ if ( callback ) callback(); }
        , error:    callback
        });
      }

    , getFormData: function(){
        var data = {};

        $this.find('[name]').each( function(){
          var $el = $( this );

          data[ $el.attr('name') ] = $el.val();
        });

        return data;
      }

    , displaySuccess: function(){
        var $success = $( options.successSelector );
        var oldText = $success.html();
        $success.fadeOut( function(){
          $success.html( options.successText );
          $success.fadeIn();

          setTimeout( function(){
            $success.fadeOut( function(){
              $success.html( oldText );
              $success.fadeIn();
            });
          }, options.successTextDuration );
        });
      }

    , displayError: function( error ){
        $this.find('.errors').html([
          '<p class="error alert alert-warning">'
        , 'I\'m sorry. Something went horribly wrong! '
        , 'Can you please try refreshing the page and trying again?'
        , '<br /><br />'
        , 'If the problem persists, would you mind dropping us a line '
        , 'at chrystie@enrgconsultants.com'
        , '</p>'
        ].join(''));
      }

    , displayValidationErrors: function( errors ){
        $this.find('.has-error').removeClass('has-error');
        $this.find( '[name="' + errors.join('"], [name="') + '"]').parents(
          '.form-group'
        ).addClass('has-error');
      }

    , validate: function( data ){
        var errors = [];

        for ( var key in data ){
          if ( !(key in options.validators) ) continue;
          if ( options.validators[ key ]( data[ key ] ) ) continue;
          errors.push( key );
        }

        return errors;
      }

    , clearForm: function(){
        $this.find('.errors').html('');
        $this.find('.has-error').removeClass('has-error');
        $this.find('input, textarea').val('');
      }
    };

    plugin.init();

    return plugin;
  };

})( jQuery );