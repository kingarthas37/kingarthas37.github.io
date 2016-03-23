'use strict';

var React = require('react');

var HeaderRight = require('./header-right-dropdown');

var Header = React.createClass({
    render: function() {
        return (

            <div>
                <header data-am-widget="header" className="am-header am-header-default bg-c-pink">
                    <div className="am-header-nav am-header-left">
                        <a href={this.props.data.left.link}>
                            <span className="c-white am-icon-angle-left am-header-icon"></span>
                        </a>
                    </div>
                    <h1 className="am-header-title">
                        <a>{this.props.title}</a>
                    </h1>

                    {this.props.data.right.ifExist ? <HeaderRight shoppingCartAmount={this.props.data.right.shoppingCartAmount} /> : ''}

                </header>
            </div>

        );
    }
});


module.exports = Header;