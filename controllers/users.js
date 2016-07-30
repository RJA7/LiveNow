'use strict';

const CONSTANTS = require('../constants/main');
const ERRORS = require('../constants/errors');
const UserModel = require('../models/users');
const validate = require('validate.js');

const validConstraints = {
    _id           : {numericality: {onlyInteger: true}},
    age           : {numericality: {onlyInteger: true, greaterThanOrEqualTo: 14, lessThanOrEqualTo: 35}},
    sex           : {inclusion: CONSTANTS.SEXES},
    city          : {inclusion: CONSTANTS.CITIES},
    availableTo   : {numericality: {onlyInteger: true}},
    matcherAgeFrom: {numericality: {onlyInteger: true, greaterThanOrEqualTo: 14, lessThanOrEqualTo: 35}},
    matcherAgeTo  : {numericality: {onlyInteger: true, greaterThanOrEqualTo: 14, lessThanOrEqualTo: 35}},
    matcher       : {numericality: {onlyInteger: true}}
};

module.exports = exports = {};

function clearMatch(userId, matcherId, cb) {
    UserModel.findByIdAndRemove(userId, function () {
        UserModel.findByIdAndRemove(matcherId, cb);
    })
}

exports.fetchMe = function (req, res, next) {
    const now = req.headers['unix-date'];
    const session = req.session;
    const user = session.user || {};
    const _id = user._id;
    let matcherId;

    if (!_id) {
        return next(ERRORS.ERROR(401, ERRORS.UNAUTHORIZED));
    }

    UserModel.findById(_id).populate('matcher').lean().exec(function (err, user) {
        if (err || !user) {
            return next(err || ERRORS.ERROR(404, ERRORS.NOT_FOUND));
        }

        if (user.matcher && (user.availableTo > now || user.matcher.availableTo > now)) {
            delete user.matcher;
            return clearMatch(_id, matcherId, function () {
                res.status(200).send(user);
            });
        }

        res.status(200).send(user);
    });
};

exports.changeMe = function (req, res, next) {
    const reqBody = req.body;
    const session = req.session;
    const user = session.user || {};
    const _id = user._id;
    const invalid = validate(reqBody, validConstraints);

    if (!_id) {
        return next(ERRORS.ERROR(401, ERRORS.UNAUTHORIZED));
    }

    if (invalid) {
        return next(ERRORS.ERROR(400, ERRORS.BAD_REQUEST, invalid));
    }

    reqBody.matcher = null;

    UserModel.findByIdAndUpdate(_id, reqBody, {new: true, lean: true}).exec(function (err, user) {
        if (err || !user) {
            return next(err || ERRORS.ERROR(404, ERRORS.NOT_FOUND));
        }

        session.user = user;
        res.status(200).send(user);
    });
};

exports.logout = function (req, res) {
    req.session.destroy();
    res.status(200).send({ok: 1});
};

// for tests
exports.pushMe = function (req, res) {
    req.session.user = req.body;
    res.status(200).send({ok: 1});
};
