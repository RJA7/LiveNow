define([
    'jQuery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    return Backbone.Router.extend({
        routes: {
            'login': 'login',
            'match': 'match',
            'main' : 'main',
            '*all' : 'all'
        },

        login: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/login'], function (LoginView) {
                this.view = new LoginView();
            }.bind(this));
        },

        match: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/match'], function (MatchView) {
                this.view = new MatchView();
            }.bind(this));
        },

        main: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/main'], function (MainView) {
                this.view = new MainView();
            }.bind(this));
        },

        all: function () {
            console.log(404);
            APP.start();
        }
    });
});
