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


            var timer = setTimeout(function () {
                APP.initUser('home');
            }, 4000);

            popup.onClose = function(){
                clearTimeout(timer);
                APP.initUser('home');
                popup.close();
            };
        },

        logout: function () {
            $
                .get('/users/logout')
                .always(function () {
                    APP.user = null;
                    APP.menuView ? APP.menuView.undelegateEvents() : '';
                    $('#menu').empty();
                    APP.initUser('home');
                });
        }
    });
});
