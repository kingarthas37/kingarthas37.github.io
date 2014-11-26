In.add('fdchart-css',{path:'./public/images/fdchart.css',type:'css',charset:'utf-8'});
In.add('kinetic',{path:'./public/src/kinetic-v3.9.8.js',type:'js',charset:'utf-8',rely:['fdchart-css']});
In.add('chart-line',{path:'./public/line.js',type:'js',charset:'utf-8'});
In.add('chart-bar',{path:'./public/bar.js',type:'js',charset:'utf-8'});
In.add('chart-pie',{path:'./public/pie.js',type:'js',charset:'utf-8'});
In.add('chart-mesh',{path:'./public/mesh.js',type:'js',charset:'utf-8'});
In.add('chart-area',{path:'./public/area.js',type:'js',charset:'utf-8'});

var fdChartObj = {};
var global = $(window);
 
$.fn.showFdChart = function(options) {

  if(!Modernizr.canvas) return false;
	
   var settings = $.extend({
	container:this,
    type:'line',
	width:'100%',
	height:200,
	active:true,
	animate:true,
	showValue:false,
	showType:false,
	resize:true,
	bgColor:'#fff',
	colors:['#2f6e97','#e32c00','#e49400','#587b45','#88b5b8','#4572a7','#aa4643','#89a54e','#71588f','#4198af','#db843d','#93a9cf','#d19392','#b9cd96','#a99bbd'],
	baseColor:'#ddd',
	data:'/statics/plugins/fdchart/datas/data-line.js',
	initSize:0,
	callback:function() {}
   },options || {});
 
  var container = settings.container;
  
  container.addClass('chart-'+settings.type).css('background',settings.bgColor);

  var index = $('.fd-chart').index(this);
  var datas;
    
	In('kinetic',function() {  
        if(typeof(settings.data)=='string') {
          $.getJSON(settings.data, function(data){
			datas = data[0];
		    startCanvas();
          });
        }else {
		  datas = settings.data;
          startCanvas();
        }
	});
 
	
  function startCanvas() {
	  
	var w = settings.width =='100%' ? container.width() : settings.width;
    var h = settings.height =='100%' ? container.parent().height() : settings.height;
	
	container.css({
	  'background-image':'none',
	  width:w,
	  height:h
    });
	
	fdChartObj[index] = {
	  datas:datas,
	  settings:settings
	}
 
 
 
 	 In('chart-'+settings.type,function() {
      switch(settings.type) {
        case 'line':
          initFdLineChart(index,w,h); 
        break;
        case 'bar':
          initFdBarChart(index,w,h);
	    break;	
	    case 'pie': 
	      initFdPieChart(index,w,h);
	    break;
		case 'area':
	      initFdAreaChart(index,w,h);
	    break;
		case 'mesh':
		  initFdMeshChart(index,w,h);
		break;
      } 
    });  
	
	  if(settings.showType) {
	  $('<a data-type="bar" class="type bar" title="柱状图">柱状图</a><a data-type="line" class="type line" title="线状图">线状图</a><a data-type="area" class="type area" title="瀑布图">瀑布图</a>').prependTo(container);
      $('.type',container).each(function() {
	    if($(this).attr('data-type')==settings.type) {
		  $(this).addClass('cur');	
		} 
	  }).bind({
	click:function() {
	  $('.type',container).removeClass('cur');
	  $(this).addClass('cur');
	  settings.type = $(this).attr('data-type');
	  global.trigger('resize');
	}  
  });
  }
  
  
 
  }
  

  
  global.bind({
    resize:function() {
	 
	 if(settings.resize) {
      
      $.each(fdChartObj,function(index,item) {
		  
		var width = item.settings.width;
		var height = item.settings.height;
		
        if(width=='100%' || height =='100%') { 
          item.settings.initSize ++ ;
	      if(item.settings.initSize == 1) { 
	        setTimeout(function() {
			  
			  var container = item.settings.container.hide();
			  
			  var w = width =='100%' ? container.parent().width() : width;
  		      var h = height =='100%' ? container.parent().height() : height;
			  
		      container.css({width:w,height:h,display:'block'});
			  
			  In('chart-'+item.settings.type,function() {
  		        switch(item.settings.type) {
     	          case 'line':
         		    initFdLineChart(index,w,h,true); 
     	  	      break;
     		      case 'bar':
     		        initFdBarChart(index,w,h,true);
	 		      break;
	  		      case 'pie':
	  		        initFdPieChart(index,w,h,true);
	  		      break;
				  case 'pie':
	  		        initFdMeshChart(index,w,h,true);
	  		      break;
				  case 'area':
	  		        initFdAreaChart(index,w,h,true);
	  		      break;  
     		    } 
    	      });
		      item.settings.initSize=0;
	        },1000);	
	      }
	    }
      });
	  
	 }
	 
    }  
  });
  
  return this;
}