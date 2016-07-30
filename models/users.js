'use strict';

const CONSTANTS = require('../constants/main');
const mongoose = require('mongoose');
const uuid = require('node-uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id           : {type: String, required: true, unique: true},
    age           : {type: Number, min: 14, max: 35},
    sex           : {type: String, default: CONSTANTS.SEX.BOY, enum: CONSTANTS.SEXES},
    city          : {type: String, enum: CONSTANTS.CITIES},
    availableTo   : {type: Number},
    matcherAgeFrom: {type: Number, default: 14, min: 14, max: 35},
    matcherAgeTo  : {type: Number, default: 35, min: 14, max: 35},

    matcher: {type: String, ref: 'user', default: null}
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
