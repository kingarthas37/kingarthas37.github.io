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
        'public/admin.min.css':[
            '/public/dev/css/admin/main.scss'
        ],
        'public/admin.min.js':[
            '/public/dev/js/external/**.min.js',
            '/public/dev/js/admin/main.js'
        ]
    },

    deploy : {
        build : {
            to : './'
        }


    }
});



fis.config.set('modules.postpackager', [function(ret, conf, settings, opt) {
    fis.util.map(ret.pkg, function(subpath, file){
        if(file.isCssLike){
            var content = file.getContent();
            content = content.replace(/\/public\/dist/gi,'public/dist');
            file.setContent(content);
        }
    });
}]);