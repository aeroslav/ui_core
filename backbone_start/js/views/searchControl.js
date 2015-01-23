define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        tplSearchControl = require('text!../../templates/searchControl.tpl');

    var SearchControl = Backbone.View.extend({

        initialize: function(opt){
            this.tpl = _.template(tplSearchControl);
            this.searchResultsView = opt.searchResultsView;
            this.render();
        },

        render: function() {
            this.$el.html(this.tpl());
        },
        events: {
            'focus #searchField-input': 'focusSearchInput',
            'blur #searchField-input': 'blurSearchInput',
            'keypress #searchField-input': 'changeSearchInput',
            'keydown #searchField-input': 'eraseSearchInput',
            'change #searchControl-authors': 'changeSearchInput'
        },

        focusSearchInput: function() {
            $('.searchField').addClass('is-focus');
        },

        blurSearchInput: function() {
            $('.searchField').removeClass('is-focus');
        },

        changeSearchInput: function() {
            this.processInput();
        },

        eraseSearchInput: function(ev) {
            if (ev.keyCode === 8) this.processInput();
        },

        processInput: function() {
            return _.debounce(function() {
                var q = $('#searchField-input').val(),
                    isAuthorChecked = $('#searchControl-authors').prop('checked');
                this.searchResultsView.filterByStr(q, isAuthorChecked);
            }, 200);
        }()
    });
    return SearchControl;
});