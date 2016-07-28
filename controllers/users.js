'use strict';

const CONSTANTS = require('../constants/main');
const ERRORS = require('../constants/errors');
const UserModel = require('../models/users');
const validate = require('validate.js');

const validConstraints = {
    _id           : {numericality: {onlyInteger: true}},
    age           : {numericality: {onlyInteger: true, greaterThan: 15, lessThan: 26}},
    sex           : {inclusion: CONSTANTS.SEXES},
    availableTo   : {numericality: {onlyInteger: true}},
    matcherAgeFrom: {numericality: {onlyInteger: true, greaterThan: 15, lessThan: 26}},
    matcherAgeTo  : {numericality: {onlyInteger: true, greaterThan: 15, lessThan: 26}},
    matcher       : {numericality: {onlyInteger: true}}
};

const requiredConstraints = {
    _id           : {presence: true}
};

module.exports = exports = {};

function formatMongoQuery(reqQuery) {
    const mongoQuery = {};

    reqQuery._id ? mongoQuery._id = reqQuery._id : '';
    reqQuery.age ? mongoQuery.age = reqQuery.age : '';
    reqQuery.sex ? mongoQuery.sex = reqQuery.sex : '';
    reqQuery.city ? mongoQuery.city = reqQuery.city : '';
    reqQuery.ageFrom || reqQuery.ageTo ? mongoQuery.age = {
        $gte: reqQuery.ageFrom || 16,
        $lte: reqQuery.ageTo || 25
    } : '';
    reqQuery.available ? mongoQuery.availableTo = {$gt: reqQuery.available} : '';

    return mongoQuery;
}

exports.create = function (req, res, next) {
    const reqBody = req.body;
    const invalid = validate(reqBody, validConstraints);
    const required = validate(reqBody, requiredConstraints);

    if (required || invalid) {
        return next(ERRORS.ERROR(400, ERRORS.BAD_REQUEST, required || invalid));
    }

    delete reqBody.matcher;

    UserModel.create(reqBody, function (err, user) {
        if (err) {
            return next(ERRORS.MONGO(400, err));
        }

        res.status(201).send(user);
    });
};

exports.fetch = function (req, res, next) {
    const reqQuery = req.query;
    const mongoQuery = formatMongoQuery(reqQuery);

    UserModel.find(mongoQuery).lean().exec(function (err, users) {
        if (err) {
            return next(err);
        }

        res.status(200).send(users);
    });
};

exports.fetchMe = function (req, res, next) {
    const _id = req.session.user ? req.session.user._id : '0';

    UserModel.findById(_id).populate('matcher').lean().exec(function (err, user) {
        if (err) {
            return next(err);
        }

        res.status(200).send(user);
    });
};

exports.pushMe = function (req, res, next) {
    const user = req.body;
    
    if (process.env.NODE_ENV === 'production') {
        next(ERRORS.ERROR(403, ERRORS.FORBIDDEN));
    }
    
    req.session.user = user;
    res.status(200).send(user);
};

exports.changeMe = function (req, res, next) {
    const reqBody = req.body;
    const session = req.session;
    const user = session.user || {};
    const _id = user._id;
    const invalid = validate(reqBody, validConstraints);

    if (invalid) {
        return next(ERRORS.ERROR(400, ERRORS.BAD_REQUEST, invalid));
    }

    reqBody.matcher = !reqBody.matcher ? null : reqBody.matcher;

    UserModel.findByIdAndUpdate(_id, reqBody, {new: true, lean: true}).exec(function (err, user) {
        if (err || !user) {
            return next(err || ERRORS.ERROR(404, ERRORS.NOT_FOUND));
        }

        session.user = user;
        res.status(200).send(user);
    });
};

exports.deleteMe = function (req, res, next) {
    const session = req.session;
    const user = session.user || {};
    const _id = user._id;

    UserModel.findByIdAndRemove(_id, function (err, user) {
        if (err || !user) {
            return next(err || ERRORS.ERROR(404, ERRORS.NOT_FOUND));
        }

        session.destroy();
        res.status(200).send(user);
    });
};

exports.matchMe = function (req, res, next) {
    const user = req.session.user || {};
    const _id = user._id;
    const reqQuery = req.query;
    const mongoQuery = formatMongoQuery(reqQuery);
    mongoQuery._id = {$ne: _id};
    mongoQuery.matcher = null;
    
    if (!_id) {
        return next(ERRORS.ERROR(403, ERRORS.FORBIDDEN));
    }

    UserModel.findOneAndUpdate(mongoQuery, {matcher: _id}, {lean: true, new: true}, function (err, matcher) {
        if (err) {
            return next(err);
        }
        
        res.status(200).send(matcher);
    });
};

exports.endMatching = function (req, res, next) {
    const user = req.session.user || {};
    const _id = user._id;

    if (!_id) {
        return next(ERRORS.ERROR(403, ERRORS.FORBIDDEN));
    }

    UserModel.update({$or: [{_id: _id}, {matcher: _id}]}, {matcher: null}, {lean: true, multi: true}, function (err) {
        if (err) {
            return next(err);
        }

        res.status(200).send({ok: 1});
    });
};
