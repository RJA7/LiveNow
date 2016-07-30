define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/home.html'
], function ($, _, Backbone, homeTemplate) {

    return Backbone.View.extend({
        tpl: _.template(homeTemplate),

        events: {
            'click #auth': 'onAuth'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            $('#container').html(this.tpl());
        },

        onAuth: function (e) {
            APP.user ? this.login() : this.logout();
        },

        login: function () {
            window.open()
        },

        logout: function () {
            alert('no');
        }
    });
});
