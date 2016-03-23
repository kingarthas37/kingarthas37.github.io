'use strict';

var React = require('react');
var LazyLoad = require('react-lazy-load');

var utils = require('./utils');

var ProductList = React.createClass({
    render:function() {
        
        let data = this.props.data;
        let imageHeight = utils.VIEWPORT_WIDTH * 0.5;
        
        return (
            <div className="product-list">
                {data.map((item,i) => {
                    if(i % 2 === 0) {
                        return (<ul>
                            <li>
                                <a href={data[i].url}>{this.setRank(i+1)}<LazyLoad offsetVertical={200} height={imageHeight}><img src={data[i].src} /></LazyLoad></a>
                                <h4><a href={data[i].url}>{data[i].name}</a></h4>
                                <strong>￥{data[i].price}</strong>
                            </li>
                            <li>
                                <a href={data[i+1].url}>{this.setRank(i+2)}<LazyLoad offsetVertical={200} height={imageHeight}><img src={data[i+1].src} /></LazyLoad></a>
                                <h4><a href={data[i+1].url}>{data[i+1].name}</a></h4>
                                <strong>￥{data[i+1].price}</strong>
                            </li>
                        </ul>);
                    }
                })}
            </div>
        );
    },
    setRank:function(index) {
        if(this.props.ranks) {
            return (<div className="rank">No.{index}</div>);
        }
        return (<div></div>);
    }
});

module.exports = ProductList;