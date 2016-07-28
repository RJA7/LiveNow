'use strict';

const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.post('/', usersController.create);
router.get('/', usersController.fetch);
router.get('/me', usersController.fetchById);
router.put('/', usersController.change);
router.delete('/', usersController.delete);

module.exports = router;
