'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
    const dir = path.join(__dirname.split(path.sep).slice(0, -1).join(path.sep), 'public', 'index.html');
    res.sendFile(dir);
});

module.exports = router;
