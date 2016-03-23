'use strict';

var React = require('react');
var LazyLoad = require('react-lazy-load');

var HeadLine = React.createClass({
    render:function() {
        
        let image = '';
        switch(this.props.title) {
            case 'recommand':
                image = '/public/dist/images/index/head-line-1.png';
            break;    
            case 'topic':
                image = '/public/dist/images/index/head-line-2.png';
            break;
            case 'hot':
                image = '/public/dist/images/index/head-line-3.png';
            break;
        }
        
        return (
           <h3>
               <LazyLoad>
                <img src={image} />
               </LazyLoad>
           </h3>
        );
    }
});

module.exports = HeadLine;