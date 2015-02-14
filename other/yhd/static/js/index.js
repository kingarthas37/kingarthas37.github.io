var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android
        };
    }()
}

if(browser.versions.ios && document.getElementById('download-app')) {
    document.getElementById('download-app').href = 'https://itunes.apple.com/us/app/1hao-dian/id427457043?mt=8&tp=1.1.8.3.2.Ki1QIPp-11-F4voq';
}