$(function(){$.fn.countTime=function(t){var e={startTime:0,endTime:this.attr("data-end")||0,nowTime:0,interval:1e3,minDigit:!0,showDay:!0,timeUnitCls:{day:"m-d",hour:"m-h",min:"m-m",sec:"m-s"},startTips:"",endTips:"",stopTips:"",timeStamp:!0,stampSet:{model:"normal",set:{day:"天",hour:"时",min:"分",sec:"秒"}}},a=$.extend({},e,t);return this.each(function(){function t(t,e){return t?10>e?e="0"+e:e:e}var e,i=null,n=$(this),s=$("<span></span>"),m=isNaN(a.startTime)?Date.parse(a.startTime.replace(/-/g,"/"))/1e3:Math.round(a.startTime),o=isNaN(a.endTime)?Date.parse(a.endTime.replace(/-/g,"/"))/1e3:Math.round(a.endTime);e=0===a.nowTime?Math.round((new Date).getTime()/1e3):Math.round(a.nowTime);var r={day:"",hour:"",min:"",sec:""};a.timeStamp&&(r=a.stampSet.set),function d(){var p,l={},T="";if(p=m>e?m-e:o-e,n.html(""),a.showDay?(l.day=t(a.minDigit,Math.floor(p/3600/24)),l.hour=t(a.minDigit,Math.floor(p/3600%24))):l.hour=t(a.minDigit,Math.floor(p/3600)),l.min=t(a.minDigit,Math.floor(p/60%60)),l.sec=t(a.minDigit,Math.floor(p%60)),m>e)a.startTips&&(T=a.startTips);else{if(!(o>e)){if(a.stopTips)T=a.stopTips,n.html(T);else for(var h in l)if(("day"!=h||a.showDay)&&(l[h]=0,a.timeStamp))switch(a.stampSet.model){case"after":var c=$(r[h]);s.clone().addClass(a.timeUnitCls[h]).text(l[h]).appendTo(n),c.appendTo(n);break;case"normal":s.clone().addClass(a.timeUnitCls[h]).text(l[h]+r[h]).appendTo(n)}return clearTimeout(i),!1}a.endTips&&(T=a.endTips)}n.html(T);for(var h in l)if(("day"!=h||a.showDay)&&a.timeStamp)switch(a.stampSet.model){case"after":var c=$(r[h]);s.clone().addClass(a.timeUnitCls[h]).text(l[h]).appendTo(n),c.appendTo(n);break;case"normal":s.clone().addClass(a.timeUnitCls[h]).text(l[h]+r[h]).appendTo(n)}e+=a.interval/1e3,i=setTimeout(function(){d()},a.interval)}()})}});
;var Taov2=function(){};$(function(){-1!==location.href.indexOf("category_id=")&&-1===location.href.indexOf("#item")&&(location.href=location.href+"#item"),-1!==location.href.indexOf("tejia.b5m.com/brand")&&$("#Fixed_left").find(".ttj-fixd-list a").each(function(t,e){$(e).attr("href","javascript:;").click(function(){return $("html,body").animate({scrollTop:$(".wc-item-wp[data-id="+$(e).attr("data-id")+"]").offset().top}),!1})}),$("#query").autoFill("http://s.b5m.com/allAutoFill.htm","tejia"),$(".header-rearch-submit").click(function(){location.href="/search/"+$("#query").val()}),$("#query").on("keyup",function(t){13===t.keyCode&&$(".header-rearch-submit").click()}),function(){var t=$(".page .page-field"),e=$(".page .page-go");url=location.href,t.length&&e.click(function(){if(!/\d+/.test(t.val()))return alert("请输入正确的页数！"),!1;var e=Number($(".pagenum").attr("page"));return t.val()>e?location.href=location.href.replace(/page=\d+/,"page="+e):t.val()<1?location.href=location.href.replace(/page=\d+/,""):(location.href=-1===url.indexOf("page=")?location.href+(-1===url.indexOf("?")?"?":"&")+"page="+t.val():location.href.replace(/page=\d+/,"page="+t.val()),void 0)})}(),$("img[lazy-src]:visible").imglazyload({fadeIn:!0}),$("img[lazy-src]").one("lazyload",function(){$(this).imglazyload({fadeIn:!0})})}),Taov2.prototype.index=function(){document.body.clientWidth>980?this._ElementScroll($("#Fixed_left"),"fixed",function(t,e,i){{var a=parseInt(t.attr("top"));parseInt(t.attr("left"))}e>a?(t.addClass(i),t.css({left:t.attr("left")+"px",top:"0px"})):(t.removeClass(i),t.css({left:"5px"}))}):document.body.clientWidth<980&&this._ElementScroll($("#Fixed_top"),"fixed",function(t,e,i){{var a=parseInt(t.attr("top"));parseInt(t.attr("left"))}e>a?(t.addClass(i),t.css({left:t.attr("left")+"px",top:"0px","z-index":1e3})):(t.removeClass(i),t.css("left","0px"))}),$(".ttj-fixd-list").find("a").click(function(){$(this).addClass("hover"),$(this).siblings().removeClass("hover")}),$(".taotj-image-rotation").find("ul").find("li").length>3&&($(".taotj-image-rotation").find("ul").find("li").each(function(){var t=$(this).clone();$(".taotj-image-rotation").find("ul").append(t)}),$(".taotj-image-rotation").find("ul").css("margin-left","-326px"),$(".taotj-image-rotation").find(".image-rotation-l").click(function(t){t.preventDefault();var e=$(this).siblings("ul");e.animate({marginLeft:"-=326px"},300,function(){var t=e.find("li:first").remove();t.appendTo(e),e.css("margin-left","-326px")})}),$(".taotj-image-rotation").find(".image-rotation-r").click(function(t){t.preventDefault();var e=$(this).siblings("ul");e.animate({marginLeft:"+=326px"},300,function(){var t=e.find("li:last").remove();e.prepend(t),e.css("margin-left","-326px")})}));window.location.href;$("[time]").each(function(){var t=$(this),e=t.attr("start"),i=t.attr("end");t.countTime({startTime:e,endTime:i})})},Taov2.prototype.detail=function(){function t(){var t=$(window).scrollTop(),e=$(".boutique").outerHeight(),i=parseInt($(".boutique").attr("top")),a=$(".footer").offset().top-e-10,o=$(".boutique").offset().left;t>=i&&a>t?($(".boutique").removeClass("wc-r-absolute"),$(".boutique").css("left",o.toString()+"px"),$(".boutique").addClass("fixed").css("top","0px")):t>=a?($(".boutique").removeClass("fixed wc-r-absolute"),$(".boutique").attr("style",""),$(".boutique").css("left","0px"),$(".boutique").addClass("wc-r-absolute")):i>=t&&$(".boutique").attr("class","boutique")}$(".boutique").attr("top",$(".boutique").offset().top),$("#panelsTop").attr("top",$("#panelsTop").offset().top),$(window).on("load",function(){$(".wc-detail-l").height()>$(".wc-detail-r").height()?($(".wc-detail-r").height($(".wc-detail-l").height()),$(window).on("scroll",function(){t()})):$(window).on("scroll",function(){})}),$(".convert").on("click","li",function(){var e=$(this).index();$(".invtroduce-detail").eq(e).show(),$(".invtroduce-detail").eq(e).siblings(".invtroduce-detail").hide(),$(this).addClass("current"),$(this).siblings().removeClass("current"),$(".wc-detail-l").height()>$(".wc-detail-r").height()?($(".wc-detail-r").height($(".wc-detail-l").height()),$(window).on("scroll",function(){t()})):$(".wc-detail-r").height($(".boutique").outerHeight()+$(".wc-detail-r .title").outerHeight())}),$(".usertext").on("keyup",function(){var t=200-$(this).val().length;0>=t?($(this).val($(this).val().substr(0,200)),$(this).siblings(".input-num").find("strong").text("0")):$(this).siblings(".input-num").find("strong").text(t),0==$(this).val().length&&$(this).siblings(".input-num").find("strong").text("200")}),$("[time]").each(function(){var t=$(this),e=t.attr("start"),i=t.attr("end");t.countTime({startTime:e,endTime:i})})},Taov2.prototype.brand=function(){this._ElementScroll($("#Fixed_left"),"fixed",function(t,e,i){{var a=parseInt(t.attr("top"));parseInt(t.attr("left"))}e>a?(t.addClass(i),t.css("left",t.attr("left")+"px")):(t.removeClass(i),t.css("left","5px"))}),$("[time]").each(function(){var t=$(this),e=t.attr("start"),i=t.attr("end");t.countTime({startTime:e,endTime:i})})},Taov2.prototype.brandDetail=function(){$("[time]").each(function(){var t=$(this),e=t.attr("start"),i=t.attr("end");t.countTime({startTime:e,endTime:i,stampSet:{model:"after",set:{day:"<em>天</em>",hour:"<em>时</em>",min:"<em>分</em>",sec:"<em>秒</em>"}}})})},Taov2.prototype._ElementScroll=function(t,e,i){t.attr({left:t.offset().left,top:t.offset().top}),$(window).scroll(function(){var a=$(this).scrollTop();i(t,a,e)})};var taoInit=new Taov2;