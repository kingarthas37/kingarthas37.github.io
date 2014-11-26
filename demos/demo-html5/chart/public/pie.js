var initFdPieChart = function(chartIndex,stageWidth,stageHeight,update) {
  
  var datas = fdChartObj[chartIndex].datas;
  var settings = fdChartObj[chartIndex].settings;
  var container = settings.container;
   	 
  var stage,labelContainer,titleContainer,tipContainer,YaxisLabelWidth,XaxisSpace;
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
	  //draw title 
	  $.each(datas.title,function(i,n) {
		var color = getColor(i);
		if(!update) {
	      titleContainer[0].innerHTML += '<span>&nbsp;<em style="background-color:'+color+'"></em><b data-color="'+color+'"> '+n+'</b></span>';
		}
	  });
	}
	

	function initChart() {
		
      var chartLayer = new Kinetic.Layer({id:'chartLayer'});
	  
	  var groupArr = [];
 
       var radius = stageHeight/2-20;

      $.each(datas.values,function(i,n) {
		  
        var color = getColor(i);
		
		groupArr.push(new Kinetic.Group({id:'group-'+i,alpha:0}));
		
		var startAngle = 0;
		var endAngle = 3.6*datas.values[0].value;
		
		if(i>0)  {
		    for(var index=1;index<=i;index++) {
		      startAngle += 3.6*(datas.values[index-1].value);
		      endAngle += 3.6*datas.values[index].value;
		    }
		  }
 
	    if(settings.showValue) {   
	      
	  	  var lineX1 =  stageWidth/2+Math.cos(Math.PI/180*(endAngle - (endAngle-startAngle)/2))*radius;
	      var lineY1 = stageHeight/2 + 10+Math.sin(Math.PI/180*(endAngle - (endAngle-startAngle)/2))*radius;
		  var lineX2 = stageWidth/2+Math.cos(Math.PI/180*(endAngle - (endAngle-startAngle)/2))*(radius+5);
		  var lineY2 = stageHeight/2 + 10+Math.sin(Math.PI/180*(endAngle - (endAngle-startAngle)/2))*(radius+5);
		  var lineX3 = lineX2+25*(lineX1>stageWidth/2 ? 1: -1);
		  
		  var pieX = Math.cos(Math.PI/180*(endAngle - (endAngle-startAngle)/2))*5;
		  var pieY = Math.sin(Math.PI/180*(endAngle - (endAngle-startAngle)/2))*5;
			   
		  groupArr[i].add(new Kinetic.Line({
		    id:'line-'+i,
            points:[lineX1,lineY1,lineX2,lineY2,lineX3,lineY2],
            stroke:color,
            strokeWidth:1,
			alpha:1
          }));
		  
		   //tip start
		   var tip; 
		   if(!update) {
		     tip = $('<div class="tip tip-'+i+'">'+n.value+ percentage +'</div>').appendTo(labelContainer);
		   }else {
			 tip = $('.tip-'+i,labelContainer);
		   }
		   var lineYTip = lineY2 - 8;
		   var lineXTip = lineX2 + (lineX1>stageWidth/2 ? 30 : -(tip.width()+30));
		   tip.css({
		     left:lineXTip,
		     top:lineYTip
	       });
		   //tip end   
		 }
		 
		  //draw pie start
		  var pie = new Kinetic.Shape({
			drawFunc:function() {
			  var context = this.getContext();
			  context.beginPath();
		      context.moveTo(stageWidth/2,stageHeight/2+10);
		      context.arc(stageWidth/2,stageHeight/2+10,radius,startAngle*Math.PI/180,endAngle*Math.PI/180);
		      context.closePath();
		      this.stroke();
		      this.fill();
			},
			fill:color,
			alpha:(settings.active ? 0.6 : 1),
			stroke:color,
			strokeWidth: 1 
		  });
		  
		  if(settings.active) {

		    pie.on('click',function() {
		      if(typeof(n.url)=='string') {
			    global[0].location.href = n.url;
		     }else {
			    settings.callback(i,n.value);
			 }
		    }); 
			
			pie.on('mouseover touchstart',function() {
			container.addClass('pointer');
			 if(datas.title.length>1) {
			var title = $('b',titleContainer).eq(i);
			title.addClass('cur').css('background',title.attr('data-color'));
			 }
		pie.transitionTo({
	      alpha:1,
		  x:pieX,
		  y:pieY,
	      duration:0.2,
	      easing:'ease-in-out'
	    });
			
		tipContainer.html(n.value + percentage  + n.label).data({
		  tipHeight:tipContainer.height() + 15,
		  tipWidth:tipContainer.width() + 30
		}).css({
		  'background':color,
		  'display':'block'
		});
 	  
	  });
	
		  pie.on('mouseout touchend',function() {
			container.removeClass('pointer');
			 if(datas.title.length>1) {
			var title = $('b',titleContainer).eq(i);
			title.removeClass('cur').css('background','none');
			 }
		pie.transitionTo({
	      alpha:0.6,
		  x:0,
		  y:0,
	      duration:0.2,
	      easing:'ease-in-out'
	    });
			
 		 
			tipContainer.hide();
		  });
	
	 	  var offsetX = container.offset().left;
		    var offsetY = container.offset().top;
	 	    container.bind({
			  'mousemove':function(e) {
			    if(tipContainer.css('display')=='block') {
			      tipContainer.css({
		            top:getTipPosY(e.pageY - offsetY,tipContainer.data('tipHeight')),
		            left:getTipPosX(e.pageX - offsetX,tipContainer.data('tipWidth'))
		          });
			    }
			  }
		    });
			  
		  }
		  groupArr[i].add(pie);
		  chartLayer.add(groupArr[i]);
		  //draw pie end
		  
		  
		  // animate start
	  if(settings.animate && !update) { 
	  if(settings.showValue) {
	 	  var values = $('.tip',container).hide();
		}
	  
	  setTimeout(function() {	 
		groupArr[i].transitionTo({
	      alpha:1,
	      duration:0.5,
	      easing:'ease-in-out'
	    });
		
		if(settings.showValue) {
			   values.fadeIn(500);
			}
		 },i*100);
	  }else {
		  groupArr[i].attrs.alpha=1;
	  }
		 
	  });
	    
	  stage.add(chartLayer);	

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
	
 
	function getColor(i) {
	  if(i>=settings.colors.length)
		return settings.colors[i%settings.colors.length];
	  return settings.colors[i];
	}
	
}