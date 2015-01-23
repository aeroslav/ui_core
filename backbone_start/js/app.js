define(function(require){
    var b = require('backbone'),
        SearchResultsList = require('views/searchResultsList'),
        SearchControl = require('views/searchControl'),
        SearchResults = require('collections/searchResults');

    var searchResults = new SearchResults({ url: '/books.json'}), //collection of books
        searchResultsList = new SearchResultsList({ //view for list of books
            el: $('.searchResultsList'),
            collection: searchResults
        }),
        searchControl = new SearchControl({
            el: $('.searchControl'),
            searchResultsView: searchResultsList
        }); //view for controls
    searchResults.loadList();
});