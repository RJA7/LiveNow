'use strict';

const userFixtures = require('../fixtures/users');
const UserModel = require('../../models/users');
const dbHelper = require('../dbHelper');
const expect = require('chai').expect;
const agent = require('../agent');

describe('Users Handler', function () {
    const user = userFixtures.USER_1;
    let id;

    before(dbHelper.clearDB);
    
    it('should create user', function (done) {
        agent
            .post('/users')
            .send(user)
            .expect(201)
            .end(function (err, res) {
                const body = res.body;
                
                expect(body).to.have.property('_id');
                expect(body).to.have.property('age', user.age);
                expect(body).to.have.property('availableTo');
                expect(body).to.have.property('city', user.city);
                expect(body).to.have.property('matcherAgeFrom', user.matcherAgeFrom);
                expect(body).to.have.property('matcherAgeTo', user.matcherAgeTo);
                expect(body).to.have.property('sex', user.sex);

                id = body._id;

                done(err);
            });
    });

    it('should fetch user by id', function (done) {
        agent
            .get('/users/' + id)
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('_id');
                expect(body).to.have.property('age', user.age);
                expect(body).to.have.property('availableTo');
                expect(body).to.have.property('city', user.city);
                expect(body).to.have.property('matcherAgeFrom', user.matcherAgeFrom);
                expect(body).to.have.property('matcherAgeTo', user.matcherAgeTo);
                expect(body).to.have.property('sex', user.sex);

                done(err);
            });
    });

    it('should fetch users by criteria', function (done) {
        agent
            .get('/users?_id=' + id)
            .expect(200)
            .end(function (err, res) {
                const body = res.body[0];

                expect(body).to.have.property('_id');
                expect(body).to.have.property('age', user.age);
                expect(body).to.have.property('availableTo');
                expect(body).to.have.property('city', user.city);
                expect(body).to.have.property('matcherAgeFrom', user.matcherAgeFrom);
                expect(body).to.have.property('matcherAgeTo', user.matcherAgeTo);
                expect(body).to.have.property('sex', user.sex);

                done(err);
            });
    });

    it('should fetch users by criteria', function (done) {
        agent
            .get('/users?ageTo=' + user.age)
            .expect(200)
            .end(function (err, res) {
                const body = res.body[0];

                expect(body).to.have.property('_id');
                expect(body).to.have.property('age', user.age);
                expect(body).to.have.property('availableTo');
                expect(body).to.have.property('city', user.city);
                expect(body).to.have.property('matcherAgeFrom', user.matcherAgeFrom);
                expect(body).to.have.property('matcherAgeTo', user.matcherAgeTo);
                expect(body).to.have.property('sex', user.sex);

                done(err);
            });
    });

    it('should not fetch users by criteria', function (done) {
        agent
            .get('/users?ageTo=' + (user.age - 1))
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.be.an('array').with.length(0);

                done(err);
            });
    });

    it('should update user', function (done) {
        agent
            .put('/users/' + id)
            .send({age: 25})
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('age', 25);

                done(err);
            });
    });

    it('should delete user', function (done) {
        agent
            .delete('/users/' + id)
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('_id', id);
                expect(body).to.have.property('age', 25);

                done(err);
            });
    });

    it('should create valid user by user model', function (done) {
        UserModel.create({_id: '123'}, function (err, user) {

            expect(user).to.have.property('_id');
            expect(user).to.have.property('age');
            expect(user).to.have.property('matcherAgeFrom');
            expect(user).to.have.property('matcherAgeTo');
            expect(user).to.have.property('sex');

            done(err);
        });
    });
});
