'use strict';

const autocompletesRouter = require('./autocomplete');
const usersRouter = require('./users');
const mainRouter = require('./main');
const express = require('express');
const vkRouter = require('./vk');
const router = express.Router();

router.use('/autocompletes', autocompletesRouter);
router.use('/users', usersRouter);
router.use('/vk', vkRouter);
router.use('/', mainRouter);

module.exports = router;
