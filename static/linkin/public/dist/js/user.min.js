(function($,window) {
    
    'use strict';
    
    window.LINKIN = window.LINKIN || function() {};

 
    
    //登录页
    LINKIN.initPageUserLogin = function() {
        $('#form-main-login').validate({
            messages:{
                email:{
                    required:'请输入邮箱',
                    email:'请输入正确的邮箱格式'
                },
                password:{
                    required:'请输入密码'
                }
            }
        });
    };

    
    //注册页
    LINKIN.initPageUserReg = function() {
        $('#form-main-reg').validate({
            messages:{
                username:{
                    required:'请输入用户名'  
                },
                email:{
                    required:'请输入邮箱',
                    email:'请输入正确的邮箱格式'
                },
                password:{
                    required:'请输入密码'
                },
                companyname:{
                    required:'请输入公司名'
                }
            }
        });
    };

    //忘记密码
    LINKIN.initPageUserForget = function(url) {
        var modalTip = $('#modal-forget-tip');
        
        var form = $("#form-main-forget"),
            safecodeRequestError = $('#safecode-request-error'),
            email = form.find('input[name=email]'),
            safeCode = form.find('input[name=safecode]');

        form.validate({
            messages:{
                email:{
                    required:'请输入邮箱',
                    email:'请输入正确的邮箱格式'
                },
                safecode:{
                    required:'请输入验证码'
                }
            },
            submitHandler:function() {
                if(!url) {
                    setTimeout(function() {
                        //safecodeRequestError.show().text('验证码输入错误');
                        modalTip.modal();
                    },1000);
                    return;
                }
                $.ajax({
                    url:url,
                    type: 'GET',
                    data: 'email='+ $.trim(email.val()) + '&safecode=' + $.trim(safeCode.val()),
                    success:function(data) {
                        if(data === 'true' || data === true) {
                            modalTip.modal();
                            return;
                        }
                        safecodeRequestError.show().text('验证码输入错误');
                    }
                });
            }
        });
        
        $('input[name=safecode]').focus(function() {
            safecodeRequestError.hide();
        });
        
    };
    
    //重设密码
    LINKIN.initPageUserChangePwd = function() {
        $('#form-main-changepwd').validate({
            rules: {
                confirmPassword: {
                    equalTo: "input[name=newPassword]"
                }
            },
            messages:{
                passwrod:{
                    required:'请输入原密码'
                },
                newPassword:{
                    required:'请输入新密码'
                },
                confirmPassword:{
                    required:'请输入确认新密码',
                    equalTo:'请输入相同的新密码'
                }
            }
        });
    };
    
    
    //新手引导页
    LINKIN.initPageUserGuide = function() {
        $('.guide').each(function(i,n) {
            if(i < 3) {
                $(n).find('a').click(function() {
                    $(n).removeClass('active');
                    $(n).next().addClass('active');
                });
            }
        });
    };
    
    //搜索
    LINKIN.initPageUserSearch = function() {
        
        var dateStart = $('#date-start'),
            dateEnd = $('#date-end'),
            dateLabelError = $('.date-error');
 
        
        //select init
        $('#form-main-search select').select2();

        //validate init
        $('#form-main-search').validate({
            messages:{
                passwrod:{
                    required:'请输入原密码'
                },
                brandname1:{
                    required:'请输入品牌名'
                },
                brandname2:{
                    required:'请输入品牌名'
                },
                category1:{
                    required:'请输入品类'
                },
                category2:{
                    required:'请输入品类'
                },
                product1:{
                    required:'请输入产品'
                },
                product2:{
                    required:'请输入产品'
                }
            },
            submitHandler: function(){ 
             
                //如果有一个时间没有填
                if( dateStart.val() !== '' && dateEnd.val() === '') {
                    dateLabelError.text('请选择结束时间');
                    return false;
                }
                
                if( dateStart.val() === '' &&  dateEnd.val() !== '') {
                    dateLabelError.text('请选择起始时间');
                    return false;
                }
                
                if( new Date(dateStart.val()).getTime() > new Date(dateEnd.val()).getTime()) {
                    dateLabelError.text('起始时间不能晚于结束时间');
                    return false;
                }
                
                return true;
            },
            invalidHandler: function(){  

            }
        });

        
        
        

        //date init
        $('#date-start,#date-end').blur(function() {
            dateLabelError.text('');
        }).datetimepicker({
            lang:'ch',
            timepicker:false,
            format:'Y/m/d',
            maxDate:'+1970/01/01',
            onSelectDate:function() {
                
            }
        });


       
        

        //search key 
        $('.search-key-add').click(function() {
            var btn = $(this).parents('.search-content2').find('.btn-box');
            var index = $('.form-inline.copy').length + 2;
            btn.before('<div class="form-inline copy"><div class="label">重点搜索</div> <div class="form-group"><input type="text" name="search-key-' + index + '" class="form-control search-key"></div> <span class="label"><a href="javascript:;" class="search-key-remove">-</a></span></div>');
        });

        $('.search-content2').on('click','.search-key-remove',function() {
            var content = $(this).parents('.form-inline');
            content.detach();
            $('.search-key').each(function(i,n) {
                if(i > 0) {
                    n.name = 'search-key-' + (i+1);
                }
            });
        });
    };
     
    
    //分析页
    LINKIN.initPageUserAnalysis = function() {
        
        $('.cloud-content').cloudTag();
        
        $('.bar-chart').barChart();
        
        $('.pie-chart').eq(0).pieChart();
        
        $('.pie-chart').eq(1).pieChart({
            color:['#07b7f0','#c1c1c1'],
            radius : [160, 210],
            center : [210, 210]
        });
        
        $('.circle-content').circleMode();
        
        var doc = $('html,body');
        $('.analysis-items a').each(function(i,n) {
            $(n).click(function() {
                doc.animate({'scrollTop': $('.analysis-details').find('h2').eq(i).offset().top - 20});
            });
        });
        
    };
    
    window.linkin = new LINKIN(); 
    
})(jQuery,window);


$.fn.barChart = function(opts) {

    var settings = $.extend({
        color:['#d92c4a','#57bbbd','#cdd6a9']
    },opts || {});
    
    return this.each(function() {
        
        var _this = $(this);

        var _datas = _this.attr('data-content').split(',');

        require([
            'echarts',
            'echarts/chart/bar'
        ],
            function (ec) {
                var chart = ec.init(_this[0]);
                var option =  {
                    grid:{
                        borderWidth:0,
                        backgroundColor:'#efefef',
                        x:50,
                        y:20,
                        x2:0,
                        y2:20
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : [1,2,3],
                            axisLine: {
                                show:false
                            },
                            splitLine: {
                                show:true,
                                lineStyle:{
                                    color: '#fff'
                                }
                            },
                            axisTick:{
                                show:false
                            },
                            axisLabel:{
                                show:false
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel: {
                                formatter:'{value}%'
                            },
                            max:100,
                            min:0,
                            splitNumber:4,
                            axisLine: {
                                show:false
                            },
                            splitLine: {
                                show:false
                            }
                        }
                    ],
                    series : [
                        {
                            barCategoryGap:2,
                            type:'bar',
                            data:_datas,
                            itemStyle:{
                                normal:{
                                    color:function(params) {
                                        var colorList = settings.color;
                                        return colorList[params.dataIndex]
                                    }
                                }

                            }
                        }
                    ]

                };
                chart.setOption(option);
            }
        );
    });
     
};

$.fn.pieChart = function(opts) {
    
    var settings = $.extend({
        color:['#d92c4a','#ccd5aa'],
        radius : [45, 100],
        center : [100, 100]
    },opts || {});

    return this.each(function() {
        
        var _this = $(this);

        var _datas = [];
        var dataArr = _this.attr('data-content').split(',');

        $.each(dataArr,function(i,n) {
            _datas.push({value:n});
        });

        require([
            'echarts',
            'echarts/chart/pie'
        ],
            function (ec) {
                var chart = ec.init(_this[0]);
                var option = {
                    series : [
                        {
                            type:'pie',
                            radius : settings.radius,
                            center : settings.center,
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    },
                                    color:function(params) {
                                        var colorList = settings.color;
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                            data:_datas
                        }
                    ]
                };

                chart.setOption(option);
            }
        );
    });
};

$.fn.cloudTag = function() {
    
    return this.each(function() {
        
        var _this = $(this);
        
        var _datas = _this.attr('data-content').split(',');
        
        var _values = _this.attr('data-value').split(',');
         

        var json = (function() {
            var arr = [];
            $.each(_datas,function(i,n) {
                arr.push({"name": n, "size": 1});
            });
            return {
                "children": arr
            };
        })();
         
  

        var diameter = parseInt(_this.attr('data-size')),
            format = d3.format(",d"),
            color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(_this[0]).append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var circle = svg.append("circle")
            .attr("class", "nodebg")
            .attr("r", diameter / 2)
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")")
            .style("fill", _this.attr('data-color'));
            
            var node = svg.selectAll(".node")
                .data(bubble.nodes(classes(json))
                    .filter(function(d) { return !d.children; }))
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            var radiusArr = [];

            node.append("circle")
                .attr("r", function(d) {
                    radiusArr.push(d.r);
                    return d.r;
                })
                .style("fill", function(d) { return  _this.attr('data-color'); });
 

            node.append("text")
                .attr("dy", ".3em")
                .style('fill', '#fff')
                .style("text-anchor", "middle")
                .style("font-size", function (n,i) {
                    
                    //取得字体大小比例值
                    var ratio = (3-1) / (1000-1);
                    //计算出字体大小
                    var value = ((_values[i] * 100) * ratio + 1) * 10;
                    
                    //如果字体的font-size * 字体的个数 > 直径值
                    //console.log(value, n.className, n.className.length);
                    if(n.className.length * value > n.r *2) {
                        //将该字体最大范围设为直径大小
                        value = value * ( (n.r *2) / (n.className.length * value));
                    }
                    
                    return value + 'px';
                })
                .text(function(d) { return d.className; });

        function classes(root) {
            var classes = [];

            function recurse(name, node) {
                if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
                else classes.push({packageName: name, className: node.name, value: node.size});
            }

            recurse(null, root);
            return {children: classes};
        }

        d3.select(self.frameElement).style("height", diameter + "px");
         
        
    });
  

};

$.fn.circleMode = function() {
    
    return this.each(function() {
        var _this = $(this);
        
        var value = parseInt(_this.attr('data-value')),
            circle1 = _this.find('.circle-1'),
            circle2 = _this.find('.circle-2');
        
        circle1.css('left',value/4 + '%');
        circle2.css('right',value/4 + '%');
        
    });
    
};