'use strict';

const UserModel = require('../../models/users');
const dbHelper = require('../dbHelper');
const expect = require('chai').expect;
const agent = require('../agent');

describe('Matches Handler', function () {
    const availableTo = Math.floor((Date.now() + 86400000) / 1000);
    const user = {
        _id: '7777777',
        sex: 'Boy',
        age: 23,
        city: 'Novoyavorivsk',
        matcherAgeFrom: 14,
        matcherAgeTo: 35,
        availableTo: availableTo
    };
    const candidate = {
        _id: '1234567',
        sex: 'Girl',
        age: 18,
        city: 'Novoyavorivsk',
        matcherAgeFrom: 14,
        matcherAgeTo: 35,
        availableTo: availableTo
    };

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

    it('should update user without matcher', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;
                
                expect(body).to.have.property('matcher', null);
                expect(body).to.have.property('availableTo', user.availableTo);

                done(err);
            });
    });

    it('should create candidate', function (done) {
        UserModel.create(candidate, done);
    });

    it('should match users', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher').that.is.an('object');
                expect(body).to.have.property('availableTo', user.availableTo);

                UserModel.findById(candidate._id).lean().exec(function (err, candidate) {

                    expect(candidate).to.have.property('matcher', user._id);

                    done(err);
                });
            });
    });

    it('should clear match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .get('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);
                expect(body).to.have.property('availableTo', null);

                UserModel.findById(candidate._id).lean().exec(function (err, candidate) {

                    expect(candidate).to.have.property('matcher', null);

                    done(err);
                });
            });
    });

    it('should update candidate', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {matcher: '1'}, done);
    });

    it('should not match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });

    it('should update candidate', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {matcher: null, sex: user.sex}, done);
    });

    it('should not match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });

    it('should update candidate', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {sex: candidate.sex, availableTo: Math.floor(Date.now() / 1000)}, done);
    });

    it('should not match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });

    it('should update candidate', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {availableTo: Math.floor(Date.now() / 1000) + 1}, done);
    });

    it('should match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher').that.is.an('object');

                done(err);
            });
    });

    it('should update candidate', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {city: 'Kiev', matcher: null}, done);
    });

    it('should not match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });

    it('should update users', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {city: user.city, matcherAgeFrom: 17}, function () {
            UserModel.findByIdAndUpdate(user._id, {age: 16}, done);
        });
    });

    it('should not match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });

    it('should update candidate', function (done) {
        UserModel.findByIdAndUpdate(candidate._id, {matcherAgeTo: 15, matcherAgeFrom: 15}, done);
    });

    it('should not match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher', null);

                done(err);
            });
    });

    it('should update users', function (done) {
        UserModel.findByIdAndUpdate(user._id, {age: 15}, {new: true}, function (err, user) {
            UserModel.findByIdAndUpdate(candidate._id, {availableTo: availableTo}, done);
        });
    });

    it('should match', function (done) {
        user.available = Math.floor(Date.now() / 1000);

        agent
            .post('/matches')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.have.property('matcher').that.is.an('object');

                done(err);
            });
    });
});
