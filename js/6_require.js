requirejs.config({
    baseUrl: '../js/require',
    paths: {
        'underscore': './libs/underscore-min',
        'jquery': './libs/jquery',
        'backbone': './libs/backbone-min',
        'bootstrap': './libs/bootstrap-min'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: '$.fn.alert'
        }
    }
});

requirejs(['main'], function(main) {
    console.log('requirejs fn');
});