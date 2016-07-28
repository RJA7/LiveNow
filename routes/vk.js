'use strict';

const vkController = require('../controllers/vk');
const express = require('express');
const router = express.Router();

router.get('/auth', vkController.auth);

module.exports = router;
