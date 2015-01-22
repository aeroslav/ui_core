define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        tplSearchResultsList = require('text!../../templates/searchResult.tpl');

    var SearchResultsList = Backbone.View.extend({

        initialize: function(searchResultsCollection) {
            console.log('init SearchResultsList');
            this.searchResultsList = searchResultsCollection;
            this.tpl = _.template(tplSearchResultsList, {variable: 'data'});
            this.render();
        },

        truncStr: function(str,lng) {
            if (str.length>lng) {
                str = str.substr(0,lng) + '&hellip;';
                return str;
            } else
                return str;
        },

        renderItem: function(el, tags, lengths) {
            var df = document.createDocumentFragment(),
                rec = document.createElement('li'),
                tplData;

            if (_.isObject(el)&&(el.title !== '')) {
                var keys = _.keys(el);

                _.each(keys, function (key, i){
                    el[key] = this.truncStr(el[key], lengths[i]);
                }, this);
                tplData = {
                    el: el,
                    tags: tags
                };

                rec.className = 'searchResult cf';
                rec.innerHTML = this.tpl(tplData); // render template with passed data
                df.appendChild(rec);
                return df;
            } else
                return false;
        },

        render: function() {
            console.log('render SearchResultsList');
            var renderedList = document.createDocumentFragment();
            _.each(this.searchResultsList, function(el) {
                var record = this.renderItem(el, ['span','span','p'], [25, 25, 150]);
                if (record) {
                    renderedList.appendChild(record);
                }
            }, this);

            this.$el.append(renderedList);
        },

        updateView: function() {
            console.log('update SearchResultsList');
        }
    });

    return SearchResultsList;
});
