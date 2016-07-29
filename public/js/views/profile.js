define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/profile.html'
], function ($, _, Backbone, profileTemplate) {

    return Backbone.View.extend({
        tpl: _.template(profileTemplate),

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
