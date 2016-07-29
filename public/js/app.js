var APP = APP || {};
APP.client_id = '5563809';
APP.host = 'https://live-now.herokuapp.com/';

define([
    'jQuery',
    'underscore',
    'backbone',
    './router'
], function ($, _, Backbone, Router) {

    APP.handleError = function errorHandler(err) {
        console.log(err);
        APP.start();
    };
    
    APP.navigate = function (url) {
        Backbone.history.navigate(url, {trigger: true});  
    };

    var initialize = function () {
        var fragment = Backbone.history.fragment;
        new Router();

        Backbone.history.start({silent: true});
        Backbone.history.fragment = '';

        $.get('/users/me', function (user) {
            APP.user = user;

            APP.user ? APP.navigate(fragment) : APP.navigate('home');
        });
    };

    return {
        initialize: initialize
    };
});
