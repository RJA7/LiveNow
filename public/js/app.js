var APP = APP || {};
APP.client_id = '5563809';
APP.host = 'https://live-now.herokuapp.com/';
APP.vk = 'https://vk.com/id166633460';
APP.facebook = '';
APP.google = 'mailto:kopanskyy.roman@gmail.com';
APP.twitter = '';

define([
    'jQuery',
    'underscore',
    'backbone',
    './router',
    'views/menu',
    './helpers/messenger'
], function ($, _, Backbone, Router, MenuView, messenger) {

    APP.error = function (err) {
        var res = err.responseJSON();
        if (!res) return;
        var message = res.errors && res.errors[0] ? res.errors[0] : res.message || err.statusText;
        message ? messenger.alert('error', message) : '';
    };

    APP.errorMessage = function (message) {
        messenger.alert('warning', message);
    };

    APP.success = function (message) {
        messenger.alert('success', message);
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
