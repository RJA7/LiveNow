'use strict';

const autocompletesRouter = require('./autocomplete');
const ERRORS = require('../constants/errors');
const matchesRouter = require('./matches');
const usersRouter = require('./users');
const mainRouter = require('./main');
const express = require('express');
const vkRouter = require('./vk');
const router = express.Router();

function notFound(req, res, next) {
    next(ERRORS.ERROR(404, ERRORS.NOT_FOUND));
}

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).send(Object.assign(ERRORS.ERROR(), err));
}

router.use('/autocompletes', autocompletesRouter);
router.use('/matches', matchesRouter);
router.use('/users', usersRouter);
router.use('/vk', vkRouter);
router.use('/', mainRouter);

router.use(notFound);
router.use(errorHandler);

module.exports = router;
