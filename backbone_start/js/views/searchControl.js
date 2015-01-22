define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        tplSearchControl = require('text!../../templates/searchControl.tpl');

    var SearchControl = Backbone.View.extend({
        initialize: function(){
            this.tpl = _.template(tplSearchControl);
            this.render();
        },
        render: function() {
            this.$el.html(this.tpl());
        }
    });
    return SearchControl;
});