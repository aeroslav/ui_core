requirejs.config({
    baseUrl: '../js/require',
    map: {
        '*': {'jquery': 'noConf'},
        'noConf': {'jquery': 'jquery'}
    }
});

requirejs(['main'], function(app) {
    console.log('6_require');
});