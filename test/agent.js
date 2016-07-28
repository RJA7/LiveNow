var request = require('supertest');
var app = require('../app');

var agent = request.agent(app);

module.exports = agent;
