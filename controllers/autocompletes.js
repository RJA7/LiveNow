'use strict';

const CONSTANTS = require('../constants/main');
require('../config/development');

exports.find = function (req, res, next) {
    const strict = req.query.strict;
    const text = req.params.text;
    const cities = CONSTANTS.CITIES;
    const citiesLength = cities.length;
    let result = false;
    let i;
    
    if (strict) {
        result = cities.indexOf(text) !== -1;
    } else {
        for (i = 0; i < citiesLength; i++) {
            if (cities[i].toLowerCase().startsWith(text.toLowerCase())) {
                result = cities[i];
                break;
            }
        }
    }
    
    res.status(200).send({city: result});
};
