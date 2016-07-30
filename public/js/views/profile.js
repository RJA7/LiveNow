define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/profile.html',
    'validator'
], function ($, _, Backbone, profileTemplate, validator) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(profileTemplate),

        events: {
            'change #age' : 'onAgeChange',
            'change #city': 'onCityChange',
            'click #save' : 'onSave',
            'keyup #city' : 'onCompletes'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl());
        },

        onAgeChange: function (e) {
            validator.age($('#age').val());
        },

        onCityChange: function (e) {
            validator.city($('#city').val());
        },

        onCompletes: function (e) {
            var $city = $('#city');
            var text = $city.val();
            var selectionStart = text.length;
            var selectionEnd;

            if (!text) return;
            if (this.textLength || APP.city >= selectionStart) {
                this.textLength = selectionStart;
                return;
            }

            $
                .get('/autocompletes/' + text)
                .done(function (res) {
                    if (!res.city) return;
                    selectionEnd = res.city.length;
                    $city.val(res.city);
                    $city.selectRange(selectionStart, selectionEnd); // setSelectionRange
                });
        },

        onSave: function (e) {
            var user = {
                age : $('#age').val(),
                city: $('#city').val(),
                sex : $('#sex').children(':selected')
            };

            if (!validator.profileUser(user)) return;

            $
                .ajax('/users', {
                    type   : 'PUT',
                    headers: {'unix-date': Date.now() / 1000},
                    data   : user
                })
                .done(function (res) {
                    var user = APP.user = res;

                    if (user.city || user.age) {
                        APP.success('Ok! Now you are ready for <a href="matches">meets</a>');
                    }
                })
                .fail(APP.error);
        }
    });
});
