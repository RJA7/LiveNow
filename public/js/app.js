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
        new Router();

        Backbone.history.start({silent: true});
        fragment = Backbone.history.fragment;
        Backbone.history.fragment = '';

        $.get('/users/me', function (user) {
            APP.user = user;

            if (APP.user) {
                new MenuView();
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
