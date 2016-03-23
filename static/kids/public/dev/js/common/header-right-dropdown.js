'use strict';

var React = require('react');

var DropDown = require('./dropdown');

var Header = React.createClass({
    getInitialState:function(){
        return {ifShow:false}
    },
    toggleDropdown:function(){
        this.setState({ifShow:!this.state.ifShow});
    },
    render: function() {
        return (
            <div className="am-header-nav am-header-right p-r">
                <a onClick={this.toggleDropdown}>
                    <span className="c-white am-icon-bars am-header-icon"></span>
                    <i className="green-dot"></i>
                </a>
                {this.state.ifShow ? <DropDown shoppingCartAmount = {this.props.shoppingCartAmount} /> : ''}
            </div>
        );
    }
});


module.exports = Header;