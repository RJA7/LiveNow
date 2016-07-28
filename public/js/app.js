var APP = APP || {};
APP.client_id = '5563809';
APP.host = 'http://localhost/';

define([
    'jQuery',
    'underscore',
    'backbone',
    './router'
], function ($, _, Backbone, Router) {

    APP.start = function () {
        $.get('/users/me', function (user) {
            APP.user = user;

            if (!APP.user) {
                return Backbone.history.navigate('login', {trigger: true});
            }

            if (APP.user.matcher) {
                return Backbone.history.navigate('match', {trigger: true});
            }

            Backbone.history.navigate('main', {trigger: true});
        });
    };

    APP.handleError = function errorHandler(err) {
        console.log(err);
        APP.start();
    };

    var initialize = function () {
        var router = new Router();

        Backbone.history.start({silent: true});
        Backbone.history.fragment = '';

        APP.start();
    };

    return {
        initialize: initialize
    };
});
