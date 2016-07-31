'use strict';

const logger = require('../libs/logger')(module);
const mongoose = require('mongoose');
const env = process.env;
let db;

mongoose.connect(env.DB_HOST, env.DB_NAME, env.DB_PORT, {
    user: env.DB_USER,
    pass: env.DB_PASS
});

db = mongoose.connection;

function onConnected() {
    logger.info('DB connected');
}

function onError(err) {
    logger.error('DB can\'t connect', err);
    process.exit(1);
}

db.once('connected', onConnected);
db.on('error', onError);

module.exports = db;
