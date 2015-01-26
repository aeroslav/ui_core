define(function(require){
    var b = require('backbone'),
        AppView = require('views/appView-view'),
        SearchResultsCollection = require('collections/searchResults-collection');

    var searchResultsCollection = new SearchResultsCollection({ url: '/books.json'}), //collection of books
        appView = new AppView({
            resListCollection: searchResultsCollection,
            controlViewSel: '.searchControl',
            resListViewSel: '.searchResultsList'
        });

    searchResultsCollection.loadList();
});