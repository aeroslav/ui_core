define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        SearchResultModel = require('models/searchResult-model');

    var SearchResultsCollection = Backbone.Collection.extend({
        model: SearchResultModel,
        initialize: function(opt){
            if (_.isObject(opt)) this.url = opt.url;
            this.listenTo(this, 'all', this.log);
        },
        loadList: function(opt){
            this.fetch({
                success: function (coll, res) {
                    console.log('Models loaded in Collection searchResultsCollection,', res.length, 'items');
                },
                error: function (coll, res) {
                    console.log('error occured while fetching collection from server');
                },
                reset: true
            });
        },
        log: function(arg) {
            console.log(arg);
        }
    });

    return SearchResultsCollection;
});