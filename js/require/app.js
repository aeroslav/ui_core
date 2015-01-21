define(function(require){
    var //_ = require('underscore'),
        //$ = require('jquery'),
        b = require('backbone'),
        field = null,
        callbacks = [],
        lastExecResult = null;
    var app = {
        setField: function(sel){
            field = $(sel);
        },
        init: function(sel){
            if ($(sel).length == 0) return false;
            this.setField(sel);
            callbacks = Array.prototype.slice.call(arguments, 1);
            return true;
        },
        exec: function(str) {
            var result = [];
            if (callbacks) {
                _.each(callbacks, function(cb,i) { // underscore was used just for test
                    var r = cb(str);
                    result.push(r);
                });
            } else {
                result = false;
            };
            lastExecResult = result;
            return result;
        },
        showResults: function(nodes,results){
            if (!results) {
                results = lastExecResult;
            };
            if (nodes.length !== results.length) return false;
            results.forEach(function(r, i) {
                console.log(r);
                $(nodes[i]).text(r);
            });
        }
    };
    console.log('module app loaded');
    return app;
})