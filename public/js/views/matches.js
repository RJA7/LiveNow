define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/matches.html'
], function ($, _, Backbone, matchesTemplate) {

    return Backbone.View.extend({
        tpl: _.template(matchesTemplate),

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
