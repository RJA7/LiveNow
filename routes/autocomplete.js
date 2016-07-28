'use strict';

const autocompletesController = require('../controllers/autocompletes');
const express = require('express');
const router = express.Router();

router.get('/:text', autocompletesController.find);

module.exports = router;
