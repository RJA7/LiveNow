define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/matches.html'
], function ($, _, Backbone, matchesTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(matchesTemplate),

        events: {
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl());
        }
    });
});
