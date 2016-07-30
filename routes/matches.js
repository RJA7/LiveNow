'use strict';

const matchesController = require('../controllers/matches');
const express = require('express');
const router = express.Router();

router.post('/', matchesController.match);
router.get('/', matchesController.clear);

module.exports = router;
