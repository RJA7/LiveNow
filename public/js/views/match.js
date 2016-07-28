define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/match.html'
], function ($, _, Backbone, matchTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(matchTemplate),

        events: {
            'click #endMeeting': 'onEndMeeting'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl(APP.user));
        },

        onEndMeeting: function () {
            $.get('users/end', function (user) {
                APP.start();
            });
        }
    });
});
