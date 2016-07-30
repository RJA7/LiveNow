'use strict';

const config = require('./config/' + (process.env.NODE_ENV || 'development'));
const httpSession = require('./libs/httpSession');
const bodyParser = require('body-parser');
const mainRouter = require('./routes');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const app = express();

app.use(helmet());
app.use(bodyParser.json({strict : false, inflate: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(httpSession());
app.use(logger('dev'));
app.use(mainRouter);

module.exports = app;
