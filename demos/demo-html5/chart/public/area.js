var initFdAreaChart = function(chartIndex,stageWidth,stageHeight,update) {
  
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
 
	
      $.each(datas.values,function(i,n) {
		  
        var color = getColor(i);
		var linePointArr = [XaxisSpace+YaxisLabelWidth,stageHeight - bottomBorder,XaxisSpace+YaxisLabelWidth,getXaxisPoint(n[0].value)];
		
	     $.each(n,function(index,item) {
		   
		   //line arr
	       linePointArr.push(XaxisSpace+XaxisSpace*index*2 + YaxisLabelWidth,getXaxisPoint(item.value));
		   
		   //line tip start
		   if(settings.showValue) {
		   var w = XaxisSpace*2-40;
		  var x = XaxisSpace*index*2 + YaxisLabelWidth+20;
		  var y = getXaxisPoint(item.value)-22;  
		  var lineTipContainer = $('<span class="tip tip-'+i+'-'+index+'">'+ item.value + percentage+'</span>').appendTo(labelContainer);
		  lineTipContainer.css({width:w,top:y,left:x});
		   }
		   //line tip end
		});
		
		
		 linePointArr = linePointArr.concat([XaxisSpace+XaxisSpace*(n.length-1)*2 + YaxisLabelWidth,stageHeight - bottomBorder,XaxisSpace+YaxisLabelWidth,stageHeight - bottomBorder]);
		
		 
		//add line start
		group1.add(new Kinetic.Line({
			 id:'line'+i,
             points:linePointArr,
             stroke:color,
             strokeWidth:1,
			 alpha:0.3
           }));
		 //add line end
		 
		 var area = new Kinetic.Polygon({
			 id:i,
             points:linePointArr,
             fill:color,
			 alpha:0.3
           })
		 
		 
		 if(settings.active){	
		 
		 var curArea;
		 var tipActive = false;
		 
		 area.on('mouseover touchstart',function() {
			 
			 curArea = this.attrs.id;
			 
			  container.addClass('pointer');
			  
			   if(datas.title.length>1) {
			  var title = $('b',titleContainer).eq(i);
		      title.addClass('cur').css('background',title.attr('data-color'));
			   }
			   
		   	 this.moveToTop();
 
			 this.transitionTo({
	      alpha:0.6,
	      duration:0.2,
	      easing:'ease-in-out'
	    });
			 
			  tipContainer.data({
			    tipHeight:tipContainer.height() + 15,
			    tipWidth:tipContainer.width() + 30
			  }).css({
			    'background':color,
		        'display':'block'
		      });
			  
			  tipActive = true;
			 
	     });
		 
		  area.on('mouseout touchend',function() {
			  
			  container.removeClass('pointer');
			  
			   if(datas.title.length>1) {
			  var title = $('b',titleContainer).eq(i);
		      title.removeClass('cur').css('background','none');
			   }
			
			this.transitionTo({
	      alpha:0.2,
	      duration:0.2,
	      easing:'ease-in-out'
	    });
			
			 
			 
			  tipContainer.hide();
			  
			  tipActive = false;
			 
	     });
		 
		 
		    var offsetX = container.offset().left;
		    var offsetY = container.offset().top;
			
		 
			var spaceLen = datas.values[0].length*2;
			
			
	 	    container.bind({
			  'mousemove':function(e) {
			    if(tipActive) {
					var x = e.pageX - offsetX;
					var y = e.pageY - offsetY;
					var _item = datas.values[curArea][getAreaValue(curArea,spaceLen,x)];
			      tipContainer.html(_item.value+ percentage + _item.label).css({
		            top:getTipPosY(y,tipContainer.data('tipHeight')),
		            left:getTipPosX(x,tipContainer.data('tipWidth'))
		          });
			    }
			  }
		    });
		 
		 }
		 group1.add(area);
		   
		  
		
	  });
	  
	  
 
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
	
	function getAreaValue(index,len,x) {
	  for(var i=0;i<len;i+=2) {
		  if(x>=(i*XaxisSpace+YaxisLabelWidth) && x<=((i+2)*XaxisSpace+YaxisLabelWidth)) {
			  return i/2;	
		  }
	  }
	}
 
	
}