module.exports = exports = {};

const SEX = {
    BOY : 'Хлопець',
    GIRL: 'Дівчина'
};

const SEXES = [SEX.BOY, SEX.GIRL];

const CITIES = [
    'Новояворівськ',
    'Яворів'
];

exports.SEX = SEX;
exports.SEXES = SEXES;
exports.CITIES = CITIES;
exports.UUID_V4_PATTERN = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
