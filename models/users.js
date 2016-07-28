'use strict';

const CONSTANTS = require('../constants/main');
const mongoose = require('mongoose');
const uuid = require('node-uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id           : {type: String, required: true, unique: true},
    age           : {type: Number, default: 16, min: 16, max: 25},
    sex           : {type: String, default: CONSTANTS.SEX.BOY, enum: CONSTANTS.SEXES},
    city          : {type: String, enum: CONSTANTS.CITIES},
    availableTo   : {type: Date},
    matcherAgeFrom: {type: Number, default: 16, min: 16, max: 25},
    matcherAgeTo  : {type: Number, default: 25, min: 16, max: 25},

    matcher: {type: String, ref: 'user'}
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
