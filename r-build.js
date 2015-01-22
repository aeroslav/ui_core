//file with options for optimizer r.js
({
    baseUrl: 'js/require',
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
    },
    name: '../6_require',
    out: 'main-built.js'
})