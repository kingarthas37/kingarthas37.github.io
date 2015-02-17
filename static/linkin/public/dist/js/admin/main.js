(function($,window) {
    
    'use strict';
    
    window.LINKIN = function() {
        
        //初始化sidebar
        this.initSideBar();
        
    };

    
    //初始化sidebar
    LINKIN.prototype.initSideBar = function() {
        if(!('#sidebar').length) {
            return;
        }
        
        var sideBar = $('#sidebar');
        
        var barLayer1 = sideBar.find('> ul').find('> li').find('> a');
          
            barLayer1.click(function() {
                
                var _this = $(this);
                
                if(!_this.siblings().length) {
                    return;
                } 
                
                var barLayer1Child = _this.siblings();
                if(_this.hasClass('cur')) {
                    _this.removeClass('cur');
                    barLayer1Child.removeClass('cur');
                    _this.find('.glyphicon').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
                }else {
                    _this.addClass('cur');
                    barLayer1Child.addClass('cur');
                    _this.find('.glyphicon').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
                }
                
                return false;
        });
         
        
        var barLayer2 = barLayer1.siblings().find('> li').find('> a');
        barLayer2.click(function() {

            var _this = $(this);

            if(!_this.siblings().length) {
                return;
            }

            var barLayer2Child = _this.siblings();
            if(_this.hasClass('cur')) {
                _this.removeClass('cur');
                barLayer2Child.removeClass('cur');
                _this.find('span').text('+');
            }else {
                _this.addClass('cur');
                barLayer2Child.addClass('cur');
                _this.find('span').text('-');
            }

            return false;
        });
       
        
        
    };
    
    
    
    
    
    
    LINKIN.initPageAdminLogin = function() {
        $('#form-main-login').validate();
    };
    
    LINKIN.initPageAdminIndex = function() {
        $('#form-data-add').validate();
        $('#form-data-edit').validate();
        
    };
    
    
    
    
    window.linkin = new LINKIN();
    
})(jQuery,window);