'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const logger = require('./libs/logger')(module);
const http = require('http');
const app = require('./app');
const db = require('./db');
const server = http.createServer(app);

function onListening() {
    logger.info('Server available on: ' + process.env.URL.slice(0, -1) + ':' + process.env.PORT);
}

function onError(err) {
    logger.error('Can\'t start server', err);
}

server.on('listening', onListening);
server.on('error', onError);

server.listen(process.env.PORT);
