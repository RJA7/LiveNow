define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/about.html'
], function ($, _, Backbone, aboutTemplate) {

    return Backbone.View.extend({
        tpl: _.template(aboutTemplate),

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
