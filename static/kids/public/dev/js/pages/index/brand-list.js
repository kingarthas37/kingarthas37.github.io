'use strict';

var React = require('react');
var LazyLoad = require('react-lazy-load');

var BrandList = React.createClass({
    render:function() {
        return (
            <ul className="brand-list">
                {this.props.data.map(item => {
                    return (
                        <li>
                                <div className="img"><a href={item.url}><LazyLoad offsetVertical={200} height={60}><img src={item.src} /></LazyLoad></a></div>
                                <div className="text"><a href={item.url}>{item.name}</a></div>
                                <div className="ico"><i className="am-icon-angle-right"></i></div>
                        </li>
                    );
                })}
            </ul>
        );
    }
});

module.exports = BrandList;