'use strict';

const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.get('/logout', usersController.logout);
router.get('/', usersController.fetchMe);
router.put('/', usersController.changeMe);

// only development for tests
router.post('/login', usersController.pushMe);

module.exports = router;
