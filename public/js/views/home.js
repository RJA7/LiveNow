define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/home.html'
], function ($, _, Backbone, homeTemplate) {

    return Backbone.View.extend({
        el: $('#container'),
        
        tpl: _.template(homeTemplate),

        events: {
            'click #auth': 'onAuth'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl());
        },

        onAuth: function (e) {
            APP.user ? this.logout() : this.login();
        },

        login: function () {
            var popup = window.open('https://oauth.vk.com/authorize?' +
                'client_id=' + APP.client_id +
                '&scope=notifications' +
                '&redirect_uri=' + APP.host + 'vk/auth', 'VK', 'width=800, height=600');

            popup.onClose = function(){
                popup.close();
                APP.initUser('home');
            }
        },

        logout: function () {
            alert('no'); // todo
        }
    });
});
