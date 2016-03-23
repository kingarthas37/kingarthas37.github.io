'use strict';

var React = require('react');
var LazyLoad = require('react-lazy-load');

var utils = require('../../common/utils');


var ImageView = React.createClass({
    render:function() {
        let imageHeight = utils.VIEWPORT_WIDTH / 2;
        return (
            <ul className="image-list">
                {this.props.images.map(item => {
                    return <li>
                        <a href={item.url}><LazyLoad offsetVertical={200} height={imageHeight}><img src={item.src} /></LazyLoad></a>
                    </li>;
                })}
            </ul>
        );
    }
});

module.exports = ImageView;