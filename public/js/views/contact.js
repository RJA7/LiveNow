define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/contact.html'
], function ($, _, Backbone, contactTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(contactTemplate),

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
