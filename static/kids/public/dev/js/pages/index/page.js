'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Header = require('../../common/header');
var Nav = require('../../common/nav');
var Slider = require('../../common/slider');
var ProductList = require('../../common/product-list');

var IndexNav = require('./nav');
var IndexImageView = require('./image-view');
var IndexHeadLine = require('./head-line');
var IndexImageList = require('./image-list');
var IndexBrandList = require('./brand-list');

var IndexPage = React.createClass({
    render:function() {
        return (
            <div className="index-page">
                <Header/>
                <Nav nav={this.props.nav} currentPage={this.props.currentPage} />
                <Slider sliders={this.props.sliders}/>
                <IndexNav indexNav={this.props.indexNav}/>
                <IndexImageView />
                <IndexHeadLine title="recommand" />
                <IndexImageList images={this.props.imageListProduct} />
                <IndexHeadLine title="topic" />
                <IndexImageList images={this.props.imageListTopic} />
                <IndexHeadLine title="hot" />
                <ProductList data={this.props.productList} />
            </div>
        );
    }
});

var TopicPage = React.createClass({
    render:function() {
        return (
            <div className="index-page">
                <Header/>
                <Nav nav={this.props.nav} currentPage={this.props.currentPage} />
                <IndexImageList images={this.props.imageListTopic} />
            </div>
        );
    }
});

var NewsPage = React.createClass({
    render:function() {
        return (
            <div className="index-page">
                <Header/>
                <Nav nav={this.props.nav} currentPage={this.props.currentPage} />
                <Slider sliders={this.props.sliders}/>
                <ProductList data={this.props.productList} />
            </div>
        );
    }
});

var RanksPage = React.createClass({
    render:function() {
        return (
            <div className="index-page">
                <Header/>
                <Nav nav={this.props.nav} currentPage={this.props.currentPage} />
                <Slider sliders={this.props.sliders}/>
                <ProductList data={this.props.productList} ranks={true} />
            </div>
        );
    }
});

var BrandPage = React.createClass({
    render:function() {
        return (
            <div className="index-page">
                <Header/>
                <Nav nav={this.props.nav} currentPage={this.props.currentPage} />
                <IndexBrandList data={this.props.brandList} />
            </div>
        );
    }
});


module.exports = {
    indexInit:args=> {
        ReactDOM.render(<IndexPage {...args} />,document.body);
    },
    topicInit:args=> {
        ReactDOM.render(<TopicPage {...args} />,document.body);
    },
    newsInit:args=> {
        ReactDOM.render(<NewsPage {...args} />,document.body);
    },
    ranksInit:args=> {
        ReactDOM.render(<RanksPage {...args} />,document.body);
    },
    brandInit:args=> {
        ReactDOM.render(<BrandPage {...args} />,document.body);
    }
};