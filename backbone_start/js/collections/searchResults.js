define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        SearchResult = require('models/searchResult');

    var SearchResults = Backbone.Collection.extend({
        model: SearchResult,
        initialize: function(opt){
            if (_.isObject(opt)) this.url = opt.url;
        },
        loadList: function(opt){
            var that = this;
            this.fetch({
                success: function (coll, res) {
                    console.log('Models loaded in Collection searchResults,', res.length, 'items');
                },
                error: function (coll, res) {
                    console.log('error occured while fetching collection from server');
                }
            }, opt);
        }
    });

    return SearchResults;
});