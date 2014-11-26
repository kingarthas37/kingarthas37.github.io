define(function(require, exports, module) {

    var $ = require('$'),
        Boot = require('gallery/bootstrap/3.1.1/bootstrap'),
        Handlebars = require('gallery/handlebars/1.0.2/handlebars');


    //require airLine prototype module
    var airLine = require('./airline');

    //nav control
    var nav = $('#nav'),
        table = $('#table');

    //init load todday line data
    loadLineData.call(airLine,1);

    //nav bind click
    nav.find('a').click(function() {
        nav.find('.active').removeClass('active');
        $(this).parent().addClass('active');
        var curLine = parseInt($(this).attr('data-date'));
        loadLineData.call(airLine,curLine);
    });

    table.on('click','a',function() {
     //   $(this).popover('show');
        alert($(this).attr('data-content'));
    });

    function loadLineData(curLine) {
        //ajax line data
        this.selectLine(curLine,function(err,data) {
            //throw err info
            if(err)  throw new Error(err);

            //render handlebar template
            var source = $('#line-template').html();
            table.html(Handlebars.compile(source)(data));
        });
    }

    Handlebars.registerHelper('price_count',function(price,economy) {
        return price * 0.0775 + price + economy;
    });


});