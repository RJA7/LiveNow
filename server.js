'use strict';

const config = require('./config/' + (process.env.NODE_ENV || 'development'));
const http = require('http');
const app = require('./app');
const db = require('./db');
const server = http.createServer(app);

function onListening() {
    console.log('Listen');
}

function onError(err) {
    console.error(err);
}

server.on('listening', onListening);
server.on('error', onError);

server.listen(process.env.PORT);
