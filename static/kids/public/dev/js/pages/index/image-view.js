'use strict';

var React = require('react');
var LazyLoad = require('react-lazy-load');


var ImageView = React.createClass({
    render:function() {
        return (
            <div className="image-view">
                    <div>
                        <img src="/public/dist/images/index/image-view-1.jpg" alt=""/>
                        <img src="/public/dist/images/index/image-view-2.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="/public/dist/images/index/image-view-3.jpg" alt=""/>
                        <img src="/public/dist/images/index/image-view-4.jpg" alt=""/>
                    </div>
            </div>
        );
    }
});

module.exports = ImageView;