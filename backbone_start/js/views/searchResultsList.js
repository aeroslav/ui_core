define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        tplSearchResultsList = require('text!../../templates/searchResult.tpl');

    var SearchResultsList = Backbone.View.extend({

        initialize: function(opt) {
            console.log('init SearchResultsList');
            this.tpl = _.template(tplSearchResultsList, {variable: 'data'});
            this.collection.bind('change', this.render, this);
            this.curCollection = opt.curCollection;
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
            _.each(this.curCollection.models, function(el) {
                var record = this.renderItem(el.attributes, ['span','span','p'], [25, 25, 150]);
                if (record) {
                    renderedList.appendChild(record);
                }
            }, this);
            this.$el.empty();
            this.$el.append(renderedList);
        },

        filterByStr: function(str, isAuthorNeeded) {
            this.curCollection.models = _.filter(this.collection.models, function(el) {
                console.log('filtering:', str, isAuthorNeeded);
                if (str === '') return false;
                if (el.attributes.author === '' && isAuthorNeeded) return false;
                if (el.attributes.title.toLowerCase().search(str.toLowerCase()) === -1) {
                    return false
                } else return true;
            });
            this.render();
        }
    });

    return SearchResultsList;
});
