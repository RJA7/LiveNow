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
            var $age = $('#age');
            !validator.age($age.val()) ? $age.val(APP.user.age || '') : '';
        },

        onCityChange: function (e) {
            var $city = $('#city');
            validator.city($city.val(), function (err, res) {
                err ? $city.val(APP.user.city || '') : '';
                this.textLength = $city.val().length;
            }.bind(this));
        },

        onCompletes: function (e) {
            var $city = $('#city');
            var text = $city.val();
            var selectionStart = text.length;
            var selectionEnd;

            if (!text) return;
            if (!this.textLength || this.textLength >= selectionStart) return this.textLength = selectionStart;
            this.textLength = selectionStart;

            $
                .get('/autocompletes/' + text)
                .done(function (res) {
                    if (!res.city) return;
                    selectionEnd = res.city.length;
                    $city.val(res.city);
                    $city.get(0).setSelectionRange(selectionStart, selectionEnd);
                });
        },

        onSave: function (e) {
            var user = {
                age : $('#age').val(),
                city: $('#city').val(),
                sex : $('#sex').children(':selected').val()
            };
            
            validator.profileUser(user, function (err) {
                if (err) return;
                
                $
                    .ajax('/users', {
                        type   : 'PUT',
                        headers: {'unix-date': Date.now() / 1000},
                        data   : user
                    })
                    .done(function (res) {
                        var user = APP.user = res;

                        if (user.city && user.age) {
                            APP.success('Ok! Now you are ready for <a href="matches">matches</a>');
                        }
                    })
                    .fail(APP.error);
            });
        }
    });
});
