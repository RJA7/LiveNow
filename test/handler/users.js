'use strict';

const UserModel = require('../../models/users');
const dbHelper = require('../dbHelper');
const expect = require('chai').expect;
const agent = require('../agent');

describe('Users Handler', function () {
    let user = {_id: '7777777'};
    before(dbHelper.clearDB);
    
    it('should create user', function (done) {
        UserModel.create(user, done);
    });

    it('should login user', function (done) {
        agent
            .post('/users/login')
            .send(user)
            .expect(200)
            .end(done);
    });


    it('should fetch current user', function (done) {
        agent
            .get('/users')
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('_id');
                expect(body).to.have.property('sex', 'Boy');
                expect(body).to.have.property('matcherAgeFrom', 14);
                expect(body).to.have.property('matcherAgeTo', 35);

                done(err);
            });
    });

    it('should update current user', function (done) {
        agent
            .put('/users')
            .send({age: 25})
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('age', 25);

                done(err);
            });
    });

    it('should fail to update user with bad city', function (done) {

        agent
            .put('/users')
            .send({city: 'badCity'})
            .expect(400)
            .end(function (err, res) {
                const body = res.body;

                expect(body.errors[0]).to.equal('badCity is not included in the list');

                done(err);
            });
    });

    it('should not update user matcher', function (done) {

        agent
            .put('/users')
            .send({matcher: '123'})
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });
});
