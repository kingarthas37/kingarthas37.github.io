'use strict';

var React = require('react');

var PureImage = React.createClass({
    render: function() {
        return (

            <div className="full-image">
                <img src={this.props.imgSrc} alt=""/>
            </div>

        );
    }
});

module.exports = PureImage;