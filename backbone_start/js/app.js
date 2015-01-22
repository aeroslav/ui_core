define(function(require){
    var b = require('backbone'),
        SearchResultsList = require('views/searchResultsList'),
        SearchControl = require('views/searchControl');

    var searchResultsList = new SearchResultsList( { el: $('.searchResultslist') } ),
        searchControl = new SearchControl( { el: $('.searchControl') } );
});