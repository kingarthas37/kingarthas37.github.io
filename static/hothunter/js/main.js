(function(window,$) {
    
    'use strict';

    
    //home view js
    var $home = $('.home'),
        screenHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
    $home.height(screenHeight);
    
    var $contact = $('.content5');
    
    //menu
    var $menu = $('.menu'),
        $menuList = $menu.find('ul'),
        scrollTop = 0;
    $(window).scroll(function() {
        var top = $(this).scrollTop();
        scrollTop = top;
        if(top >= screenHeight) {
            $menu.addClass('active');
        }else {
            $menu.removeClass('active');
        }
        
        changeMenuLink();
        changeBackground();
        
    });
    
    
    //link direct
    var $html = $('html,body');
    var menuPosArr = [];
    var currentMenuLink = 0;
    
    $('div[data-target]').each(function() {
        var top = $(this).offset().top,
            height = $(this).height();
        $(this).attr({
            'data-top':top,
            'data-height':height
        });
        menuPosArr.push({
            top:top,
            height:height + top
        });
    });
    
    $('a.link').click(function() {
        $menu.find('.active').removeClass('active');
        $(this).addClass('active');
        $html.animate({scrollTop: parseInt($('div[data-target='+ $(this).attr('data-link') +']').attr('data-top')) - 80 });
    });
    
    
    //change menu link
    function changeMenuLink() {
        $.each(menuPosArr,function(i,n) {
            
            if (scrollTop >= n.top - 120 && scrollTop <= n.height - 120  && i !== currentMenuLink) {
                currentMenuLink = i;
                $menuList.find('.active').removeClass('active');
                $menuList.find('a').eq(i).addClass('active');
                return;
            }
            
        });
    }
    
    
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
    
    
    //content2 popover
    $('[data-toggle="popover"]').popover({
        trigger:'hover',
        html:true
    });
    
})(window,jQuery);