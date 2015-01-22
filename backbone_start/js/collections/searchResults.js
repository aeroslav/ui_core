define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        SearchResult = require('models/searchResult');

    var SearchResults = Backbone.Collection.extend({
        model: SearchResult
    });

    return SearchResults;
});