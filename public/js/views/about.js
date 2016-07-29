define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/about.html'
], function ($, _, Backbone, aboutTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(aboutTemplate),

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
