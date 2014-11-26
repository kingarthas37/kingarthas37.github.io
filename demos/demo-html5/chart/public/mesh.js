var initFdMeshChart = function(chartIndex,stageWidth,stageHeight,update) {
  
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
	 
 	   var angles = 360/datas.title.length;
	   var baseLayer = new Kinetic.Layer({id:'baseLayer'});
	   
	   var radius = stageHeight/2-10;
 
	  $.each(datas.title,function(i,n) {
		var x = stageWidth/2+Math.cos(Math.PI/180*(angles*i-90))*radius;
		var y = stageHeight/2 + 5 +Math.sin(Math.PI/180*(angles*i-90))*radius;
		baseLayer.add(new Kinetic.Line({
          points:[stageWidth/2,stageHeight/2 + 5,x,y],
          stroke:settings.baseColor,
          strokeWidth:1
        }));
		
		if(!update) {
	      titleContainer[0].innerHTML += '<span>'+ n+'</span>';
		}
		
 		if(i==0) {
			$('span',titleContainer).eq(0).css({
		      top:y-20,
		      left: (stageWidth - $('span',titleContainer).eq(0).width())/2
		    });
		}else {
			$('span',titleContainer).eq(i).css({
		      top:y-8,
		      left: x> stageWidth/2 ? x+ 10 : x -$('span',titleContainer).eq(i).width() - 10
		    });
		}		
		
		
	  });
	  
	  if(settings.showValue) {
		var tip0;
	    if(!update) {
 		  tip0 = $('<div class="tip tip-'+i+'">'+ datas.min + percentage +'</div>').appendTo(labelContainer);
		}else {
		  tip = $('.tip-0',labelContainer);
		}
		tip0.css({
		  top:stageHeight/2 + 2,
		  left:stageWidth/2+6	
		});
	  }
	  
	  for(var i=1;i<=datas.steps;i++) {
		var r = radius/datas.steps*i;
		
		 //tip start
		if(settings.showValue) {
		   var tip; 
		   if(!update) {
			 var tipValue = Math.floor(i*(datas.max-datas.min)/datas.steps) + percentage;
		     tip = $('<div class="tip tip-'+i+'">'+ tipValue +'</div>').appendTo(labelContainer);
		   }else {
			 tip = $('.tip-'+i,labelContainer);
		   }
		   var lineYTip = stageHeight/2 - r + 2;
		   var lineXTip = stageWidth/2+6;
		   tip.css({
		     left:lineXTip,
		     top:lineYTip
	       });
		}
		   //tip end 
		
		var arr = [];  
		for(var j=0;j<=datas.title.length;j++) {
		  var x = stageWidth/2+Math.cos(Math.PI/180*(angles*j-90))*r;
		  var y = stageHeight/2 +5  +Math.sin(Math.PI/180*(angles*j-90))*r;
		  arr.push(x);
		  arr.push(y);
		}
		baseLayer.add(new Kinetic.Line({
          points:arr,
          stroke:settings.baseColor,
          strokeWidth:1
        }));
	  } 
	  stage.add(baseLayer);
	}
	
	function initChart() {
		
      var chartLayer = new Kinetic.Layer({id:'chartLayer'});
	  
	  var angles = 360/datas.title.length;
      var radius = stageHeight/2-10;
	  var arr = [];
	  
	   for(var i=0;i<datas.title.length;i++) {
		  var valuePos = getValuePos(datas.values[i].value,radius);
		  var x = stageWidth/2+Math.cos(Math.PI/180*(angles*i-90))*valuePos;
		  var y = stageHeight/2 + 5 +Math.sin(Math.PI/180*(angles*i-90))*valuePos;
		  arr.push(x);
		  arr.push(y);
		  
		  if(i==datas.title.length-1) {
			arr.push(arr[0]);
			arr.push(arr[1]);
		  }
		}
		
		var meshGroup = new Kinetic.Group();
		
		var meshShape = new Kinetic.Polygon({
          points:arr,
          fill:settings.colors[0],
		  alpha:0
        });
		
		var meshBorder = new Kinetic.Line({
          points:arr,
          stroke:settings.colors[0],
		  strokeWidth:1,
		  alpha:0
        });
		
		meshGroup.add(meshShape);
		meshGroup.add(meshBorder);
		
		chartLayer.add(meshGroup);
	 
		if(settings.animate && !update) { 
		 
		 meshShape.transitionTo({
	      alpha:0.5,
	      duration:0.5,
	      easing:'ease-in-out'
	    });
		
		setTimeout(function() {
		  meshBorder.transitionTo({
	      alpha:1,
	      duration:0.5,
	      easing:'ease-in-out',
	    });
		},300);
		 
		}
		
	  stage.add(chartLayer);	

	}
	

	/* functions */
   function getValuePos(value,radius) {
      return radius/(datas.max/value);
   }
   
	
}