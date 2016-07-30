const ENV = process.env.NODE_ENV || 'development';
const winston = require('winston');
const path = require('path');

function getLogger(module) {
    var dir = module.filename.split(path.sep).slice(-2).join(path.sep);

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: dir
            }),
            new winston.transports.File({
                filename: 'logs/app-logs.log',
                maxsize : '10000000', // 10 MB
                maxFiles: '10',
                colorize: true,
                level   : ENV === 'error',
                label   : dir
            })
        ]
    });
}

module.exports = getLogger;
