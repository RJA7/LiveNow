define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/profile.html'
], function ($, _, Backbone, profileTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(profileTemplate),

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
