define([], function () {

    var validateAge = function (age) {
        if (!age) return;
        return age >= 14 && age <= 35 ? true : APP.errorMessage('Age should be within 14 to 35 years.');
    };

    var validateCity = function (city, cb) {
        if (!city) return cb({});

        $
            .get('/autocompletes/' + city + '?strict=true')
            .done(function (res) {
                if (!res.city) {
                    APP.errorMessage('There is no such city in Ukraine.');
                    return cb({});
                }
                cb(null, res);
            });
    };

    var validateMatcherAge = function (age) {
        if (!age) return;
        return age >= 14 && age <= 35 ? true : APP.errorMessage('Partner age should be within 14 to 35 years.');
    };

    var validateAvailableTo = function (availableTo) {
        if (!availableTo) return;
        return availableTo >= 0 && availableTo <= 23 ? true : APP.errorMessage('Specify correct time you are ready, within 0 to 23 hours.');
    };

    var validateMatchUser = function (user) {
        if (!user.city || !user.age) {
            return APP.errorMessage('Fill your <a href="#profile">profile</a> before.');
        }

        if (!user.availableTo) {
            return APP.errorMessage('Please, specify time you are ready for meeting to.');
        }

        if (!user.matcherAgeFrom || !user.matcherAgeTo) {
            return APP.errorMessage('You must fill out partner preferred age fields before.');
        }

        if (!validateMatcherAge(user.matcherAgeFrom)) return;
        if (!validateMatcherAge(user.matcherAgeTo)) return;
        if (!validateAvailableTo(user.availableTo)) return;

        return true;
    };

    var validateProfileUser = function (user, cb) {
        if (user.age && !validateAge(user.age)) return cb({});
        if (user.city) return validateCity(user.city, cb);

        cb(null, {});
    };

    return {
        age        : validateAge,
        city       : validateCity,
        matcherAge : validateMatcherAge,
        availableTo: validateAvailableTo,
        matchUser  : validateMatchUser,
        profileUser: validateProfileUser
    }
});
