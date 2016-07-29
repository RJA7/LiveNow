define([
    'jQuery',
    'underscore',
    'backbone',
    'text!templates/menu.html'
], function ($, _, Backbone, menuTemplate) {

    return Backbone.View.extend({
        el: $('#menu'),
        
        tpl: _.template(menuTemplate),

        events: {
            'click #menuToggle, .menu-close': 'onMenu'
        },

        initialize: function (options) {
            this.render();
        },

        render: function () {
            this.$el.html(this.tpl());
        },

        onMenu: function (e) {
            $('#menuToggle').toggleClass('active');
            $('body').toggleClass('body-push-toleft');
            $('#theMenu').toggleClass('menu-open');
        }
    });
});
