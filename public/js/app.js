var APP = APP || {};
APP.client_id = '5563809';
APP.host = 'https://live-now.herokuapp.com/';

define([
    'jQuery',
    'underscore',
    'backbone',
    './router',
    'views/menu'
], function ($, _, Backbone, Router, MenuView) {

    APP.handleError = function errorHandler(err) {
        console.log(err);
        APP.start();
    };
    
    APP.navigate = function (url) {
        Backbone.history.navigate(url, {trigger: true});  
    };

    var initialize = function () {
        var fragment;
        var user;
        new Router();

        Backbone.history.start({silent: true});
        fragment = Backbone.history.fragment;
        Backbone.history.fragment = '';

        $.get('/users')
            .done(function (res) {
                APP.user = user = res;
            })
            .always(function () {
                if (user) {
                    new MenuView();

                    if (!user.age || !user.city) {
                        return APP.navigate('profile');
                    }

                    if (user.matcher) {
                        return APP.navigate('matches');
                    }

                    APP.navigate(fragment);
                } else {
                    APP.navigate('home');
                }
            });
    };

    return {
        initialize: initialize
    };
});
