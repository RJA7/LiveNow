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
            'click #edit'           : 'onEdit',
            'click #matcherContact' : 'onMatcherContact'
        },

        initialize: function (options) {
            this.render();
        },

        render: function (noMatches) {
            this.$el.html(this.tpl({noMatches: noMatches}));
        },

        onMatcherAgeFromChange: function (e) {
            var $matcherAgeFrom = $('#matcherAgeFrom');
            var $matcherAgeTo = $('#matcherAgeTo');
            !validator.matcherAge($matcherAgeFrom.val()) ? $matcherAgeFrom.val(14) : '';
            $matcherAgeFrom.val() > $matcherAgeTo.val() ? $matcherAgeTo.val($matcherAgeFrom.val()) : '';
        },

        onMatcherAgeToChange: function (e) {
            var $matcherAgeFrom = $('#matcherAgeFrom');
            var $matcherAgeTo = $('#matcherAgeTo');
            !validator.matcherAge($matcherAgeTo.val()) ? $matcherAgeTo.val(35) : '';
            $matcherAgeFrom.val() > $matcherAgeTo.val() ? $matcherAgeFrom.val($matcherAgeTo.val()) : '';
        },

        onAvailableToChange: function (e) {
            var $availableTo = $('#availableTo');
            !validator.availableTo($availableTo.val()) ? $availableTo.val((new Date().getHours() + 1) % 24) : '';
        },

        onFind: function (e) {
            var self = this;
            var user = APP.user;
            user.matcherAgeFrom = $('#matcherAgeFrom').val();
            user.matcherAgeTo = $('#matcherAgeTo').val();
            user.availableTo = $('#availableTo').val();

            if (!validator.matchUser(user)) return;

            var now = new Date();
            var availableTo = new Date(now.getFullYear(), now.getMonth(), now.getDate(), user.availableTo).getTime();
            user.availableTo = now.getTime() > availableTo ? availableTo / 1000 + 86400 : availableTo / 1000;

            $
                .ajax('/matches', {
                    type   : 'POST',
                    data   : user,
                    headers: {'unix-date': now / 1000}
                })
                .done(function (res) {
                    var noMatches = !res.matcher;
                    APP.user = res;
                    self.render(noMatches);
                    !noMatches ? APP.socket.emit('message', {_id: res.matcher._id}) : '';
                })
                .fail(APP.error)
        },

        onGotIt: function (e) {
            var self = this;
            e.preventDefault();

            $
                .ajax('/matches', {
                    type   : 'GET',
                    headers: {'unix-date': Date.now() / 1000}
                })
                .done(function (res) {
                    APP.user.matcher ? APP.socket.emit('message', {_id: APP.user.matcher._id}) : '';
                    APP.user = res;
                    self.render();
                })
                .fail(APP.error)
        },

        onEdit: function (e) {
            APP.navigate('matches');
        },

        onMatcherContact: function () {
            window.open('https://vk.com/' + APP.user.matcher._id);
        }
    });
});
