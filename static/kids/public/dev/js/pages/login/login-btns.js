'use strict';

var React = require('react');

var LoginBtns = React.createClass({
    loginWeibo: function(){
        console.log('微博登录')
    },
    loginQQ: function(){
        console.log('QQ登录')
    },
    loginAlipay: function(){
        console.log('支付宝登录')
    },
    render:function() {
        return (
            <div className="login-btns">
                <h3 className="p-r"><span>使用合作账号登录</span><i></i></h3>
                <a className="btns weibo" onClick={this.loginWeibo}><em className="am-icon-weibo am-icon-sm"></em><span>微博登录</span></a>
                <a className="btns qq" onClick={this.loginQQ}><em className="am-icon-qq am-icon-sm"></em><span>qq登录</span></a>
                <a className="btns alipay" onClick={this.loginAlipay}><em className="icon-alipay"></em><span>支付宝登录</span></a>
            </div>
        );
    }
});


module.exports = LoginBtns;