define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/contact.html'
], function ($, _, Backbone, contactTemplate) {

    return Backbone.View.extend({
        tpl: _.template(contactTemplate),

        events: {
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            $('#container').html(this.tpl());
        }
    });
});
