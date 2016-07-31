'use strict';

const CONSTANTS = require('../constants/main');
const ERRORS = require('../constants/errors');
const UserModel = require('../models/users');
const validate = require('validate.js');
const async = require('async');

const validConstraints = {
    _id           : {numericality: {onlyInteger: true}},
    age           : {numericality: {onlyInteger: true, greaterThan: 13, lessThan: 36}},
    sex           : {inclusion: CONSTANTS.SEXES},
    city          : {inclusion: CONSTANTS.CITIES},
    availableTo   : {numericality: true},
    matcherAgeFrom: {numericality: {onlyInteger: true, greaterThan: 13, lessThan: 36}},
    matcherAgeTo  : {numericality: {onlyInteger: true, greaterThan: 13, lessThan: 36}},
    matcher       : {numericality: {onlyInteger: true}}
};

const requiredConstraints = {
    _id           : {presence: true},
    age           : {presence: true},
    sex           : {presence: true},
    city          : {presence: true},
    availableTo   : {presence: true},
    matcherAgeFrom: {presence: true},
    matcherAgeTo  : {presence: true}
};

module.exports = exports = {};

exports.match = function (req, res, next) {
    const now = req.headers['unix-date'];
    const body = req.body;
    const user = Object.assign(req.session.user || {}, body);
    const required = validate(user, requiredConstraints);
    const invalid = validate(user, validConstraints);
    let updatedUser;
    let userMatcher;
    let query;

    if (required || invalid) {
        return next(ERRORS.ERROR(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    delete user.age;
    delete user.city;
    delete user.matcher;

    async.waterfall([
        function (cb) {
            UserModel.findByIdAndUpdate(user._id, user, {lean: true, new: true}, cb);
        },

        function (updated, cb) {
            updatedUser = updated;
            query = {
                age           : {$gte: updatedUser.matcherAgeFrom, $lte: updatedUser.matcherAgeTo},
                sex           : {$ne: updatedUser.sex},
                city          : updatedUser.city,
                availableTo   : {$gt: now},
                matcherAgeFrom: {$lte: updatedUser.age},
                matcherAgeTo  : {$gte: updatedUser.age},
                matcher       : null
            };
            UserModel.findOneAndUpdate(query, {matcher: updatedUser._id}, {lean: true, new: true}, cb);
        },

        function (matcher, cb) {
            userMatcher = matcher;
            matcher ? UserModel.findByIdAndUpdate(user._id, {matcher: matcher._id}, {lean: true, new: true}, cb) :
                cb(null, updatedUser);
        },

        function (updatedUser) {
            updatedUser.matcher = userMatcher ? userMatcher : null;
            res.status(200).send(updatedUser);
        }
    ], next);
};

exports.clear = function (req, res, next) {
    const user = req.session.user || {};
    const _id = user._id;

    if (!_id) {
        return next(ERRORS.ERROR(403, ERRORS.FORBIDDEN));
    }

    async.waterfall([
        function (cb) {
            UserModel.update({matcher: _id}, {matcher: null}, {lean: true, multi: true}, cb);
        },

        function (users, cb) {
            UserModel.findByIdAndUpdate(_id, {matcher: null, availableTo: null}, {lean: true, new: true}, cb);
        },

        function (user) {
            res.status(200).send(user);
        }
    ], next);
};
