'use strict';

var React = require('react');
var utils = require('./utils');

var Slider = React.createClass({
    componentDidMount: function() {
        $(this.refs.root).flexslider();
    },
    render: function() {
        
        let sliders = this.props.sliders;
        let sliderHeight = utils.VIEWPORT_WIDTH * 0.53;
        
        return <div id="slider" data-am-widget="slider" style={{height:sliderHeight}} className="am-slider am-slider-a1" ref="root">
            <ul className="am-slides">
                {
                    sliders.map(item=> {
                        return <li><a href={item.url}><img src={item.src}/></a></li>;
                    })
                }
            </ul>
        </div>;
    }
});

module.exports = Slider;