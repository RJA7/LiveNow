define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/main.html'
], function ($, _, Backbone, mainTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(mainTemplate),

        events: {
            'click #save': 'onSave',
            'change #sex': 'onSexChange',
            'keyup #city': 'autocomplete'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl(APP.user));
        },

        onSave: function () {
            var user = {
                age           : parseInt($('#age').val(), 10),
                sex           : $('#sex').children(':selected').val(),
                city          : $('#city').val(),
                availableTo   : parseInt($('#availableTo').val(), 10),
                matcherAgeFrom: parseInt($('#matcherAgeFrom').val(), 10),
                matcherAgeTo  : parseInt($('#matcherAgeTo').val(), 10)
            };
            var candidateSex = user.sex === 'Хлопець' ? 'Дівчина' : 'Хлопець';
            var query;

            if (user.availableTo || user.availableTo === 0) {
                var date = new Date();
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), user.availableTo);
                date = date < Date.now() ? new Date(date.getTime() + 86400000) : date;
                user.availableTo = date.getTime();
            }

            query = '/users/match?ageFrom=' + user.matcherAgeFrom +
                '&ageTo=' + user.matcherAgeTo +
                '&city=' + user.city +
                '&available=' + Date.now() +
                '&sex=' + candidateSex;

            $.get(query, function (matcher) {
                user.matcher = matcher ? matcher._id : null;

                $.ajax({
                    url    : '/users',
                    method : 'PUT',
                    data   : user,
                    success: function (user) {
                        APP.start();
                    }
                });
            });
        },

        onSexChange: function (e) {
            var val = $('#sex').children(':selected').val();
            var $candidate = $('#candidate');
            var $ready = $('#ready');
            if (val === 'Хлопець') {
                $candidate.html('дівчиною');
                $ready.html('Готовий');
            } else {
                $candidate.html('хлопцем');
                $ready.html('Готова');
            }
        },

        autocomplete: function (e) {
            var $city = $('#city');
            var val = $city.val();
            var selectStart;
            var selectEnd;

            if (!val) return;

            $.get('/autocompletes/' + val, function (res) {
                if (!res) {
                    return $city.css('background-color', 'darksalmon');
                }
                if (e.keyCode === 8 || e.keyCode === 37 || e.keyCode === 39) return;

                selectStart = val.length;
                selectEnd = res.length;

                $city.val(res);
                $city.css('background-color', 'darkseagreen');
                $city.get(0).setSelectionRange(selectStart, selectEnd);
            });
        }
    });
});
