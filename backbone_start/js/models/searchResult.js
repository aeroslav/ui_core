define(function(require){
    'use strict';
    var Backbone = require('backbone');

    var SearchResult = Backbone.Model.extend({
        defaults: {
            title: '',
            author: '',
            description: ''
        }
    });

    return SearchResult;
});