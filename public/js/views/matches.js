define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/matches.html',
    'validator'
], function ($, _, Backbone, matchesTemplate, validator) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(matchesTemplate),

        events: {
            'change #matcherAgeFrom': 'onMatcherAgeFromChange',
            'change #matcherAgeTo'  : 'onMatcherAgeToChange',
            'change #availableTo'   : 'onAvailableToChange',
            'click #find'           : 'onFind',
            'click #gotIt'          : 'onGotIt',
            'click #edit'           : 'onEdit'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl());
        },

        onMatcherAgeFromChange: function (e) {
            validator.matcherAge($('#matcherAgeFrom'));
        },

        onMatcherAgeToChange: function (e) {
            validator.matcherAge($('#matcherAgeTo'));
        },

        availableTo: function (e) {
            validator.availableTo($('#availableTo'));
        },

        onFind: function (e) {
            var user = APP.user;
            user.matcherAgeFrom = $('#matcherAgeFrom');
            user.matcherAgeTo = $('#matcherAgeTo');
            user.availableTo = $('#availableTo');

            if (!validator.matchUser(user)) return;

            var now = Date.now();
            var availableTo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), user.availableTo);
            user.availableTo = now > availableTo.getTime() ? availableTo.getTime() / 1000 + 86400 : availableTo.getTime();

            $
                .ajax('/matches', {
                    type   : 'POST',
                    data   : user,
                    headers: {'unix-date': now / 1000}
                })
                .done(function (res) {
                    APP.user = res;
                    APP.navigate('matches');
                })
                .fail(APP.error)
        },

        onGotIt: function (e) {
            e.preventDefault();

            $
                .ajax('/matches', {
                    type   : 'GET',
                    headers: {'unix-date': Date.now() / 1000}
                })
                .done(function (res) {
                    APP.user = res;
                    APP.navigate('matches');
                })
                .fail(APP.error)
        },
        
        onEdit: function (e) {
            APP.navigate('matches');
        }
    });
});
