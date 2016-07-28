var collections = [
    'users'
];
var config = require('../config/development');
var mongoose = require('mongoose');
var async = require('async');
var env = process.env;
var db;


var DBHelper = function () {
    mongoose.connect(env.DB_HOST + '/' + env.DB_NAME);
    db = mongoose.connection;

    process.on('SIGINT', function () {
        db.close();
    });

    this.getDB = function () {
        return db;
    };

    this.clearDB = function (cb) {
        async.each(collections, function (name, eachCb) {
            db.collection(name).deleteMany({}, eachCb);
        }, cb);
    };

    this.disconnect = function () {
        db.close();
    };

    this.connect = function () {
        db = mongoose.connect(env.DB_HOST + '/' + env.DB_NAME);
    };
};

var dbHelper = new DBHelper();

module.exports = dbHelper;
