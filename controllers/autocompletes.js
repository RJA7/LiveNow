'use strict';

const CONSTANTS = require('../constants/main');

exports.find = function (req, res, next) {
    const text = req.params.text.toLowerCase();
    const cities = CONSTANTS.CITIES;
    const citiesLength = cities.length;
    let result;
    let i;
    
    for (i = 0; i < citiesLength; i++) {
        if (cities[i].toLowerCase().startsWith(text)) {
            result = cities[i];
            break;
        }
    }
    
    res.status(200).send(result);
};
