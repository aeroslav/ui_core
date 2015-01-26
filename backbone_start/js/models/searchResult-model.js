define(function(require){
    'use strict';
    var Backbone = require('backbone');

    var SearchResultModel = Backbone.Model.extend({
        defaults: {
            title: '',
            author: '',
            description: ''
        }
    });

    return SearchResultModel;
});