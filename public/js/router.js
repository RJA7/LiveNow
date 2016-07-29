define([
    'jQuery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    return Backbone.Router.extend({
        routes: {
            'home'   : 'home',
            'profile': 'profile',
            'matches': 'matches',
            'about'  : 'about',
            'contact': 'contact',
            '*all'   : 'all'
        },

        home: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/home'], function (View) {
                this.view = new View();
            }.bind(this));
        },

        profile: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/profile'], function (View) {
                this.view = new View();
            }.bind(this));
        },

        matches: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/matches'], function (View) {
                this.view = new View();
            }.bind(this));
        },

        about: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/about'], function (View) {
                this.view = new View();
            }.bind(this));
        },

        contact: function () {
            this.view ? this.view.undelegateEvents() : '';
            require(['views/contact'], function (View) {
                this.view = new View();
            }.bind(this));
        },

        all: function () {
            alert(404);
            APP.navigate('home');
        }
    });
});
