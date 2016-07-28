'use strict';

const UserModel = require('../models/users');
const request = require('request');
const async = require('async');
const path = require('path');
const env = process.env;

module.exports = exports = {};

exports.auth = function (req, res, next) {
    const dir = path.join(__dirname.split(path.sep).slice(0, -1).join(path.sep), 'public', 'closer.html');
    const code = req.query.code;
    let _id;

    if (!code) {
        return res.sendFile(dir);
    }

    async.waterfall([
        function (cb) {
            request.get(`https://oauth.vk.com/access_token?client_id=${env.client_id}&client_secret=${env.secret}&redirect_uri=${env.redirect_uri}&code=${code}`, cb);
        },

        function (response, body, cb) {
            try {
                cb(null, JSON.parse(body));
            } catch (e) {
                cb(e);
            }
        },

        function (body, cb) {
            _id = body.user_id;
            if (!_id) return cb({});
            cb();
        },

        function (cb) {
            UserModel.findById(_id).lean().exec(cb);
        },

        function (user, cb) {
            if (!user) return UserModel.create({_id: '' + _id}, cb);
            cb(null, user);
        },

        function (user, cb) {
            req.session.user = typeof user.toObject === 'function' ? user.toObject() : user;
            cb();
        }
    ], function (err) {
        res.sendFile(dir);
    });
};
