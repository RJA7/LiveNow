'use strict';

const expect = require('chai').expect;
const agent = require('../agent');

describe('Autocompletes Handler', function () {

    it('should return valid city', function (done) {

        agent
            .get('/autocompletes/novoy')
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.eql({city: 'Novoyavorivsk'});

                done(err);
            });
    });

    it('should check city availability', function (done) {

        agent
            .get('/autocompletes/novoy?strict=true')
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                expect(body).to.eql({city: false});

                done(err);
            });
    });
});
