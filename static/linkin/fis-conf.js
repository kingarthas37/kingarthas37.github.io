fis.config.set('project.exclude', '**/_*.scss');
fis.config.set('modules.parser.scss', 'sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('settings.spriter.csssprites.margin', 20);


fis.config.merge({
    roadmap : {

        path : [

            //排除非编译目录
            {
                reg:/\/(bower_components|bin|config|lib|routes|views|release|project)\//i,
                release:false
            },

            //排除非编译文件
            {
                reg:/\/(linkin-admin\.iml|package\.json|map\.json)/i,
                release:false
            },

            //只编译development目录
            {
                reg:/\/public\/(css|js|dist|fonts)\//i,
                release:false
            },

            {
                reg:/\/public\/dev\/html\/(.*)/i,
                release:'/release/$1'
            },

            {
                reg:/\/public\/dev\/html\/(.*)/i,
                release:'/$1'
            },

            {
                reg:/\/public\/dev\/css\/(.*)/i,
                release:'/public/dist/css/$1'
            },

            {
                reg:/\/public\/dev\/images\/(.*)/i,
                release:'/public/dist/images/$1'
            },

            {
                reg:/\/public\/dev\/js\/(.*)/i,
                release:'/public/dist/js/$1'
            },

            {
                reg:/\/public\/([^\/]+\.css)/i,
                release:'public/dist/css/$1'
            },

            {
                reg:/\/public\/([^\/]+\.png)/i,
                release:'public/dist/images/$1'
            },

            {
                reg:/\/public\/([^\/]+\.js)/i,
                release:'public/dist/js/$1'
            }

        ]
    } ,

    pack:{
        'public/external.min.css':[
            '/public/dev/css/external/**.min.css'
        ],
        'public/external.min.js':[
            '/public/dev/js/external/**.min.js'
        ],
        'public/admin.min.css':[
            '/public/dev/css/admin/main.scss'
        ],
        'public/admin.min.js':[
            '/public/dev/js/admin/main.js'
        ],
        'public/user.min.css':[
            '/public/dev/css/user/main.scss'
        ],
        'public/user.min.js':[
            '/public/dev/js/user/main.js'
        ]
    },

    deploy : {
        build : {
            to : './'
        }


    }
});


//配置css中绝对路径改为相对路径
fis.config.set('modules.postpackager', [function(ret, conf, settings, opt) {
    fis.util.map(ret.pkg, function(subpath, file){
        if(file.isCssLike){
            var content = file.getContent();
            content = content.replace(/\/public\/dist/gi,'..');
            file.setContent(content);
        }
    });

     
    
}]);
 

//配置release后html文件引用css,js绝对路径改为相对路径
fis.config.set('modules.postprocessor.html', function(content, file){
    content = content.replace(/\/public\/dist/gi,'../public/dist');
    
    content = content.replace(/(\<\!\-\-unrelease\-\-start\-\-\>)[\s\S]*?(\<\!\-\-unrelease\-\-end\-\-\>)/gi,'');
    
    content = content.replace(/\<\!\-\-release\-\-start\-\-/gi,'');
    content = content.replace(/\-\-release\-\-end\-\-\>/gi,'');
    
    return content;
});


