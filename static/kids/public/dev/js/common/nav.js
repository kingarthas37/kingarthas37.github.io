'use strict';

var React = require('react');

var Nav = React.createClass({
    render: function() {
        return <nav id="nav">
            <a href={this.props.nav[0]} className={this.props.currentPage === 'index' ? 'current' : ''}><span>推荐</span></a>
            <a href={this.props.nav[1]} className={this.props.currentPage === 'topic' ? 'current' : ''}><span>专题</span></a>
            <a href={this.props.nav[2]} className={this.props.currentPage === 'news' ? 'current' : ''}><span>本周新品</span></a>
            <a href={this.props.nav[3]} className={this.props.currentPage === 'ranks' ? 'current' : ''}><span>热卖排行</span></a>
            <a href={this.props.nav[4]} className={this.props.currentPage === 'brand' ? 'current' : ''}><span>品牌</span></a>
        </nav>;
    }
});

module.exports = Nav;