require.config({
    paths: {
        underscore: './libs/underscore/underscore-min',
        backbone  : './libs/backbone/backbone-min',
        jQuery    : './libs/jquery/dist/jquery.min',
        text      : './libs/text/text',
        templates : '../templates',
        views     : './views',
        validator : './helpers/validator',
        io        : '../socket.io/socket.io'

        // collections: './collections'
    },

    shim: {
        jQuery    : {exports: '$'},
        underscore: {exports: '_'},

        backbone: {
            deps   : ['underscore', 'jQuery'],
            exports: 'backbone'
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});
