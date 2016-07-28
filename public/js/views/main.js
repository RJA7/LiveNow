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
            'change #sex': 'onSexChange'
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

            if (user.availableTo) {
                var date = new Date();
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), user.availableTo);
                date = date < Date.now() ? new Date(date.getTime() + 86400000) : date;
                user.availableTo = date;
            }

            query = '/users?ageFrom=' + user.matcherAgeFrom +
                '&ageTo=' + user.matcherAgeTo +
                '&city=' + user.city +
                '&available=true' +
                '&sex=' + candidateSex;

            $.get(query, function (users) {
                users.length ? user.matcher = users[0]._id : '';

                $.ajax({
                    url    : '/users',
                    method : 'PUT',
                    data   : user,
                    success: function (user) {
                        console.log('saved', user);
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
        }
    });
});
