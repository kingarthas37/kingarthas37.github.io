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
        $('#form-main-login').validate({
            messages:{
                username:'请输入用户名',
                password:'请输入密码'
            }
        });
    };
    
    LINKIN.initPageAdminIndex = function() {
        
        var formDataAdd = $('#form-data-add');
        formDataAdd.validate({
            messages:{
                category: formDataAdd.find('[name=category]').attr('error-info'),
                key:formDataAdd.find('[name=key]').attr('error-info')
            }
        });
        
        var formDataEdit = $('#form-data-edit');
        formDataEdit.validate({
            messages:{
                category: formDataEdit.find('[name=category]').attr('error-info'),
                key:formDataEdit.find('[name=key]').attr('error-info')
            }
        });
        
        var modalAlert = $('#modal-alert');
        
        var ckbs = $('#main .table :checkbox');
        
        //修改数据
        $('.table-header .edit').click(function() {
            
            var selectId = '',
                isChecked = 0;
            
            ckbs.each(function(i) {
                if(this.checked) {
                    isChecked ++;
                    selectId = $(this).attr('data-id');
                }
            });

            if(isChecked === 0) {
                modalAlert.modal();
                modalAlert.find('.modal-body').text('请选择至少一条需要编辑的数据!');
                $('#data-edit-checkbox-value').val(0);
                return false;
            }else if(isChecked > 1) {
                modalAlert.modal();
                modalAlert.find('.modal-body').text('最多只能选择一条需要编辑的数据!');
                $('#data-edit-checkbox-value').val(0);
                return false;
            }
            
            $('#data-edit-checkbox-value').val(selectId);
            
        });
        
        
        //删除数据
        $('.table-header .delete').click(function() {

            var selectId = '',
                isChecked = false;
            
            ckbs.each(function() {
                if(this.checked) {
                    isChecked = true;
                    selectId += $(this).attr('data-id') + ',';
                }
            });

            if(!isChecked) {
                modalAlert.modal();
                modalAlert.find('.modal-body').text('请至少选择一条需要删除的数据!');
                $('#data-delete-checkbox-value').val(0);
                return false;
            }

            $('#data-delete-checkbox-value').val(selectId.substr(0,selectId.length-1));

        });
        
    };
    
    
    
    
    window.linkin = new LINKIN();

 
    
})(jQuery,window);