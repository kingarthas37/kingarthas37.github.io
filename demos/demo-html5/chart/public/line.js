var initFdLineChart = function(chartIndex,stageWidth,stageHeight,update) {
  
  var datas = fdChartObj[chartIndex].datas;
  var settings = fdChartObj[chartIndex].settings;
  var container = settings.container;
   	 
  var stage,labelContainer,titleContainer,tipContainer,YaxisLabelWidth,XaxisSpace;
  var topBorder = 45,bottomBorder = 35;
  var percentage = datas.percentage ? '% ' : ' ';
   
  if(update) {
	  
    stage = fdChartObj[chartIndex].stage;
    stage.setSize(stageWidth,stageHeight);
    stage.removeChildren();

    labelContainer = $('.label-container',container);
	titleContainer = $('.title-container',container);
	tipContainer = $('.tip-container',container);
		 
  }else {
	 
    var stage = new Kinetic.Stage({
      container: container[0].id,
      width: stageWidth,
      height: stageHeight
	});
	
	fdChartObj[chartIndex].stage = stage;
	
	labelContainer = $('<div class="label-container"></div>').prependTo(container);
	titleContainer = $('<div class="title-container"></div>').appendTo(labelContainer);
	tipContainer = $('<div class="tip-container"></div>').appendTo(labelContainer);
 
  }
 
  initBase();
	
  initChart();
 
 
	
  //initBase
  function initBase() {
		
    var baseLayer = new Kinetic.Layer({id:'baseLayer'});
		
	  //draw title 
	  $.each(datas.title,function(i,n) {
		var color = getColor(i);
		if(!update) {
	      titleContainer[0].innerHTML += '<span>&nbsp;<em style="background-color:'+color+'"></em><b data-color="'+color+'"> '+n+'</b></span>';
		}
	  });
	 
	 //draw YaxisLabel
		var maxLabWidArr = [];
		for(i=0;i<=datas.rows;i++) {
		  var getLabel = function() {
		    if(i==0) {
		      return String(datas.max);
		    }else if(i==datas.rows) {
			  return String(datas.min);
		    }else {
			  return String(datas.max - Math.round(i*((datas.max-datas.min)/datas.rows)));
		    }
		  };
		  
		  var yLabelContainer;
		  if(!update) {
		    yLabelContainer = $('<span class="y-label">'+getLabel()+ percentage + '</span>').css({
			  top:topBorder+i*((stageHeight-80) / datas.rows)
		    }).appendTo(labelContainer);
		  }else {
		    yLabelContainer = $('.y-label',container).eq(i).css({
			  top:topBorder+i*((stageHeight-80) / datas.rows)
		    });
		  }
		  
 		  //get max label length
		  maxLabWidArr.push(yLabelContainer.width());
          YaxisLabelWidth = Math.max.apply(Math,maxLabWidArr) + 10;
		}

		XaxisSpace = (stageWidth - YaxisLabelWidth)/(datas.values[0].length*2);
	     
		//draw XaxisLabel
	 	 for(i=1;i<datas.xlabel.length*2;i+=2) {
	 	   var label = datas.xlabel[(i+1)/2-1];
		   var xLabelContainer;
		   if(!update) {
		      xLabelContainer = $('<span class="x-label">'+label+'</span>').css({
		 	   width:XaxisSpace*2-10,
			   top:stageHeight - 32,
		 	   left:YaxisLabelWidth + (XaxisSpace*i) - (XaxisSpace*2-10)/2
		 	 }).appendTo(labelContainer);
		   }else { 
			  xLabelContainer = $('.x-label',labelContainer).eq((i+1)/2-1).css({
				   width:XaxisSpace*2-10,
		 	       left:YaxisLabelWidth + (XaxisSpace*i) - (XaxisSpace*2-10)/2,
				   'line-height':'normal'
			   });
		   }
		  xLabelContainer.css('line-height',xLabelContainer.height()>20 ? '16px': '32px');
 		}
 
	     //base line
        baseLayer.add(new Kinetic.Line({
          points:[YaxisLabelWidth,topBorder,YaxisLabelWidth, stageHeight-bottomBorder,stageWidth, stageHeight-bottomBorder],
          stroke:settings.baseColor,
          strokeWidth:2
        }));
		
		//yline
		for(iy=0;iy<datas.rows;iy++) {
		  var y = topBorder+iy*((stageHeight-topBorder-bottomBorder) / datas.rows)+0.5;
		  baseLayer.add(new Kinetic.Line({
            points:[YaxisLabelWidth-5,y,stageWidth+0.5,y],
            stroke:settings.baseColor,
            strokeWidth:1
          }));
		  
		 
		} 
		
		//xline
		for(ix=1;ix<(datas.values[0].length-1)*2;ix+=2) {
	     baseLayer.add(new Kinetic.Line({
            points:[YaxisLabelWidth + XaxisSpace+ XaxisSpace*ix,stageHeight - bottomBorder + 5,YaxisLabelWidth + XaxisSpace+XaxisSpace*ix,stageHeight - bottomBorder ],
            stroke:settings.baseColor,
            strokeWidth:2
          }));
		}  
		
		stage.add(baseLayer);
		 
	}
	

	function initChart() {
		
      var chartLayer = new Kinetic.Layer({id:'chartLayer'});
      var group1 = new Kinetic.Group({x: 0,y:0,alpha:0});
	  var group2 = new Kinetic.Group({x: 0,y:0,alpha:0});
	  
	    var assistLine = new Kinetic.Line({
           points:[0,topBorder,0,stageHeight-bottomBorder],
           stroke:settings.baseColor,
           strokeWidth:1,
		   alpha:0
        });
		group1.add(assistLine);
	
      $.each(datas.values,function(i,n) {
		  
        var color = getColor(i);
		var linePointArr = [];
		
	     $.each(n,function(index,item) {
		   
		   //line arr
	       linePointArr.push(XaxisSpace+XaxisSpace*index*2 + YaxisLabelWidth,getXaxisPoint(item.value));
		   
		   var x = XaxisSpace+XaxisSpace*index*2 + YaxisLabelWidth;
		   var y  = getXaxisPoint(item.value);
		   
		   //draw point start
		   var point = new Kinetic.Circle({
             x:x,
             y:y,
             radius: 5,
             fill: '#fff',
             stroke: color,
             strokeWidth: 2
           });
		   
		    if(settings.active) {
		  
		    point.on('click',function() {
		      if(typeof(datas.values[i][index].url)=='string') {
			    global[0].location.href = datas.values[i][index].url;
		      }else {
				settings.callback(i,index,datas.values[i][index].value);
			  }
		    });
		  
		    point.on('mouseover',function() {
		  	  container.addClass('pointer');
			  
			   if(datas.title.length>1) {
			    var title = $('b',titleContainer).eq(i);
		        title.addClass('cur').css('background',title.attr('data-color'));
			   }
			  point.moveToTop();
		      point.attrs.fill = color;
			  
			  assistLine.attrs.x = x;
			  assistLine.attrs.alpha = 1;
			  
			  var line = chartLayer.get('#line-'+i)[0];
			  line.moveToTop();
			  
			  line.transitionTo({
	      alpha:1,
	      duration:0.2,
	      easing:'ease-in-out'
	    });
			  
		      
			  var _item = datas.values[i][index];
		      tipContainer.html(_item.value + percentage  + _item.label).data({
			    tipHeight:tipContainer.height() + 15,
			    tipWidth:tipContainer.width() + 30
			  }).css({
			    'background':color,
		        'display':'block'
		      });
 		    });
	
		    point.on('mouseout',function() {
		  	  container.removeClass('pointer');
			  
			   if(datas.title.length>1) {
			  var title = $('b',titleContainer).eq(i);
		      title.removeClass('cur').css('background','none');
			   }
		       point.attrs.fill = '#fff';
			   
			   assistLine.attrs.alpha = 0;
			   
			  chartLayer.get('#line-'+i)[0].transitionTo({
	      alpha:0.7,
	      duration:0.2,
	      easing:'ease-in-out'
	    });
 			 
			  tipContainer.hide();
		    });
		  
		    var offsetX = container.offset().left;
		    var offsetY = container.offset().top;
	 	    container.bind({
			  mousemove:function(e) {
			    if(tipContainer.css('display')=='block') {
			      tipContainer.css({
		            top:getTipPosY(e.pageY - offsetY,tipContainer.data('tipHeight')),
		            left:getTipPosX(e.pageX - offsetX,tipContainer.data('tipWidth'))
		          });
			    }
			  }
		    });
		  }	
			group1.add(point);
		   //draw point end
		   
		   
		   //line tip start
		   if(settings.showValue) {
		   var w = XaxisSpace*2-40;
		  var x = XaxisSpace*index*2 + YaxisLabelWidth+20;
		  var y = getXaxisPoint(item.value)-22;  
		  var lineTipContainer = $('<span class="tip tip-'+i+'-'+index+'">'+ item.value + percentage + '</span>').appendTo(labelContainer);
		  lineTipContainer.css({width:w,top:y,left:x});
		   }
		   //line tip end
		  
		});
		
		//add line start
		group2.add(new Kinetic.Line({
			 id:'line-'+i,
             points:linePointArr,
             stroke:color,
             strokeWidth:3,
			 alpha:0.6
           }));
		 //add line end
		
	  });
	  
	  chartLayer.add(group2);
	  chartLayer.add(group1);
	  stage.add(chartLayer);	
	  
	  
	  // animate start
	  if(settings.animate && !update) {
		  
		if(settings.showValue) {
	 	  var values = $('.tip',container).hide();
		}
		
		var mask = new Kinetic.Rect({x:0,y:0,width:stageWidth,height:stageHeight,fill:settings.bgColor});
		
		chartLayer.add(mask);
	     
	    mask.transitionTo({
	      x:stageWidth,
	      duration:1,
	      easing:'ease-in-out',
		  callback:function() {
		    if(settings.showValue) {
			  values.fadeIn(500);
			}
		  }
	    });
	  }
	  //animate end
	  
	  group2.attrs.alpha=1;
	  group1.attrs.alpha=1;
	  chartLayer.draw();
	}
	

	/* functions */
	function getTipPosX(x,tipWidth) {
 	  if(x > stageWidth - tipWidth) {
		return x - tipWidth + 10;  
	  }
	  return x+15;	
	}
	
	function getTipPosY(y,tipHeight) { 
	  if(y > stageHeight - tipHeight)
	    return stageHeight - tipHeight;
	  return y;	
	}
	
	function getXaxisPoint(value) {
	  var point =  stageHeight - bottomBorder -  (stageHeight-topBorder-bottomBorder)*(value/datas.max);
	  return point;
	}
	
	function getColor(i) {
	  if(i>=settings.colors.length)
		return settings.colors[i%settings.colors.length];
	  return settings.colors[i];
	}
	
}