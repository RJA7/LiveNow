'use strict';

const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.post('/', usersController.create);
router.get('/', usersController.fetch);
router.get('/me', usersController.fetchMe);
router.put('/', usersController.changeMe);
router.get('/match', usersController.matchMe);
router.get('/end', usersController.endMatching);
router.delete('/', usersController.deleteMe);

// only development for tests
router.post('/login', usersController.pushMe);

module.exports = router;
