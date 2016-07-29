define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/home.html'
], function ($, _, Backbone, homeTemplate) {

    return Backbone.View.extend({
        tpl: _.template(homeTemplate),

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
