define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/profile.html',
    'validator'
], function ($, _, Backbone, profileTemplate, validator) {

    return Backbone.View.extend({
        tpl: _.template(profileTemplate),

        events: {
            'change #age': 'onAgeChange'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            $('#container').html(this.tpl());
        },

        onAgeChange: function (e) {
            validator.age($('#age').val());
        }
    });
});
