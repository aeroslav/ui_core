define(function(require){
    var Backbone = require('backbone'),
        SearchResultsCollection = require('collections/searchResults-collection'),
        SearchResultsListView = require('views/searchResultsList-view'),
        SearchControlView = require('views/searchControl-view');

    var AppView = Backbone.View.extend({
        initialize: function(opt) {
            var that = this;
            this.searchResultsListView = new SearchResultsListView({
                el: $(opt.resListViewSel),
                collection: opt.resListCollection
            });
            this.searchControlView = new SearchControlView({
                el: $(opt.controlViewSel),
                searchResultsView: that.searchResultsListView
            })
        }
    });

    return AppView;
});