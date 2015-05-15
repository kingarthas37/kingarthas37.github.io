$(function() {

    'use strict';

    AV.$ = jQuery;
    AV.initialize(appId, appKey);
  
    var codeObj = ({
        init:function() {

            var _this = this;
            this.sendCodeInput = $('#send-code');
            this.getCodeInput = $('#get-code');
            this.orderNumberInput = $('#order-number');
            this.submitBtn = $('#submit');
            this.forwardSelect = $('#forward-selected');

            this.submitBtn.click(function() {
                _this.bindEvent();
                return false;
            });   
        },
        bindEvent:function() {

            var _this = this;

            if($.trim(this.sendCodeInput.val())==='') {
                alert('请输入您的激活码');
                this.sendCodeInput[0].focus();
                return;
            }

            if($.trim(this.orderNumberInput.val())==='') {
                alert('请输入您的订单号');
                this.orderNumberInput[0].focus();
                return;
            }

            this.submitBtn.addClass('disabled').attr('disabled',true);

            var forwardName = this.forwardSelect.find('option:selected').val();
            
            AV.Cloud.run('exchangeCodeByToken',
                {
                    "token": $.trim(_this.sendCodeInput.val()), 
                    "orderNumber": $.trim(_this.orderNumberInput.val()), 
                    "shipper": forwardName
                },
                {
                    success: function(data){
                        _this.getCodeInput.val(data.realCode);
                        _this.getCodeInput[0].select();
                        _this.getCodeInput[0].focus();
                        _this.resetDom();
                    },
                    error: function(err){
                        alert("Error: " + err.code + " " + err.message);
                        _this.resetDom();
                    }
                }
            );
        },
        resetDom:function() {
            this.submitBtn.removeClass('disabled').attr('disabled',false);
        }

    }).init();

 
});