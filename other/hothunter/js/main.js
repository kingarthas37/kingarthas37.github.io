(function(window,$) {
    
    'use strict';

    
    //home view js
    var $home = $('.home'),
        screenHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
    $home.height(screenHeight);
    
    var $contact = $('.content5');
    
    //menu
    var $menu = $('.menu'),
        scrollTop = 0;
    $(window).scroll(function() {
        var top = $(this).scrollTop();
        scrollTop = top;
        if(top >= screenHeight) {
            $menu.addClass('active');
        }else {
            $menu.removeClass('active');
        }
        
        changeBackground();
        
    });
    
    
    //link direct
    var $html = $('html,body');
    
    $('div[data-target]').each(function() {
        $(this).attr({
            'data-top':$(this).offset().top,
            'data-height':$(this).height()
        });
    });
    
    $('a.link').click(function() {
        $menu.find('.active').removeClass('active');
        $(this).addClass('active');
        $html.animate({scrollTop: parseInt($('div[data-target='+ $(this).attr('data-link') +']').attr('data-top')) - 80 });
    });
    
    
    //change background
    
    function changeBackground() {
        
        if(scrollTop >= 0 && scrollTop <= $home.attr('data-height')) {
            $home.css('background-position','50% -' + scrollTop/5 + 'px');
            return;
        }
        
        var contactTop = parseInt($contact.attr('data-top')) - screenHeight,
            contactHeight = contactTop + parseInt( $contact.attr('data-height'));
        if(scrollTop >= contactTop  && scrollTop <= contactHeight) {
            $contact.css('background-position','50% -' + (scrollTop - contactTop)/3 + 'px');
        }
        
    }
    
    
})(window,jQuery);