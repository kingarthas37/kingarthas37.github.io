'use strict';

var React = require('react');

var DropDown = React.createClass({
    render: function() {
        return (

            <ul className="drop-down">
                <li className="">
                    <a href=""><span className="am-icon-sm am-icon-home am-header-icon"></span><i>首页</i></a>
                </li>
                <li className="">
                    <a href=""><span className="am-icon-sm am-icon-search am-header-icon"></span><i>搜索</i></a>
                </li>
                <li className="">
                    <a href=""><span className="am-icon-sm am-icon-shopping-cart am-header-icon"><em>{this.props.shoppingCartAmount}</em></span><i>购物车</i></a>
                </li>
            </ul>

        );
    }
});

module.exports = DropDown;