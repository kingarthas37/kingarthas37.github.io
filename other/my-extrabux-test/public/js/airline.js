define(function(require, exports, module) {

    var $ = require('$');

    function AirLine() {

    }

    AirLine.prototype.init = function() {

    };

    AirLine.prototype.selectLine = function(id,callback) {

        $.getJSON('./data/data'+ id +'.json').then(
            //done
            function(json) {
                callback(null,json);
             },
            //failure
            function() {
                callback('data require err!');
            });
    };

    module.exports = new AirLine();

});