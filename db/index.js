'use strict';

const mongoose = require('mongoose');
const env = process.env;
let db;

mongoose.connect(env.DB_HOST, env.DB_NAME, env.DB_PORT, {
    user: env.DB_USER,
    pass: env.DB_PASS
});

db = mongoose.connection;

function onConnected() {
    console.log('DB connected');
}

function onError(err) {
    console.error('DB can\'t connect', err);
}

db.once('connected', onConnected);
db.on('error', onError);

module.exports = db;
