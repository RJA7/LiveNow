define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/login.html'
], function ($, _, Backbone, loginTemplate) {

    return Backbone.View.extend({
        el: $('#container'),

        tpl: _.template(loginTemplate),

        events: {
            'click #vkButton': 'onVkButtonClick'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl());
        },

        onVkButtonClick: function (e) {
            e.preventDefault();
            var popup = window.open('https://oauth.vk.com/authorize?' +
                'client_id=' + APP.client_id +
                '&scope=notifications' +
                '&redirect_uri=' + APP.host + 'vk/auth', 'VK', 'width=800, height=600');

            popup.onClose = function(){
                popup.close();
                APP.start();
            }
        }
    });
});
