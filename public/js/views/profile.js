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
            'click #save' : 'onSave'
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
                    headers: {'unix-date': Math.floor(Date.now() / 1000)},
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
