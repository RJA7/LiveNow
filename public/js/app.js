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

    APP.error = function (err) {
        console.log(err);
    };

    APP.errorMessage = function (message) {
        console.log(message);
    };

    APP.success = function (message) {
        console.log(message);
    };

    APP.navigate = function (url) {
        Backbone.history.navigate(url, {trigger: true});
    };

    APP.initUser = function (fragment) {
        var user;

        $
            .ajax('/users', {
                type   : 'GET',
                headers: {'unix-date': Math.floor(Date.now() / 1000)}
            })
            .done(function (res) {
                APP.user = user = res;
            })
            .fail(APP.error)
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

    var initialize = function () {
        var fragment;
        new Router();

        Backbone.history.start({silent: true});
        fragment = Backbone.history.fragment;
        Backbone.history.fragment = '';

        APP.initUser(fragment);
    };

    return {
        initialize: initialize
    };
});
