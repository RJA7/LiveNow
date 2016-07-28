'use strict';

const UserModel = require('../../models/users');
const dbHelper = require('../dbHelper');
const expect = require('chai').expect;
const agent = require('../agent');

describe('Users Handler', function () {
    let user = {_id: '7777777'};
    before(dbHelper.clearDB);
    
    it('should create user', function (done) {
        agent
            .post('/users')
            .send(user)
            .expect(201)
            .end(function (err, res) {
                const body = res.body;
                
                expect(body).to.have.property('_id', user._id);
                expect(body).to.have.property('age', 16);
                expect(body).to.have.property('matcherAgeFrom', 16);
                expect(body).to.have.property('matcherAgeTo', 25);
                expect(body).to.have.property('sex', 'Хлопець');

                user = body;

                done(err);
            });
    });

    it('should login user', function (done) {
        agent
            .post('/users/login')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('_id', user._id);
                expect(body).to.have.property('age', user.age);
                expect(body).to.have.property('matcherAgeFrom', user.matcherAgeFrom);
                expect(body).to.have.property('matcherAgeTo', user.matcherAgeTo);
                expect(body).to.have.property('sex', user.sex);

                done(err);
            });
    });


    it('should fetch current user', function (done) {
        agent
            .get('/users/me')
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('_id', user._id);
                expect(body).to.have.property('age', user.age);
                expect(body).to.have.property('matcherAgeFrom', user.matcherAgeFrom);
                expect(body).to.have.property('matcherAgeTo', user.matcherAgeTo);
                expect(body).to.have.property('sex', user.sex);

                done(err);
            });
    });

    it('should fetch users by criteria', function (done) {
        agent
            .get('/users?_id=' + user._id)
            .expect(200)
            .end(function (err, res) {
                const body = res.body[0];

                expect(body).to.have.property('_id');
                expect(body).to.have.property('age', user.age);
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

    it('should update user', function (done) {

        agent
            .put('/users')
            .send({availableTo: Date.now() + 36000000, city: 'Новояворівськ'})
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('availableTo');
                expect(body).to.have.property('city', 'Новояворівськ');

                done(err);
            });
    });

    it.skip('should find users by criteria', function (done) {

        agent
            .get('/users?ageFrom=' + 24 + '&sex=Дівчина' + '&city=' + 'Новояворівськ' + '&available=' + Date.now())
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.be.an('array').with.length(1);

                done(err);
            });
    });

    it('should delete current user', function (done) {
        agent
            .delete('/users')
            .expect(200)
            .end(function (err, res) {
                const body = res.body;

                expect(body).to.have.property('_id');
                expect(body).to.have.property('age', 25);

                done(err);
            });
    });
});
