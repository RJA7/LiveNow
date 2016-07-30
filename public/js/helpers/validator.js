define([], function () {

    var validateAge = function (age) {
        if (!age) return;
        return age >= 14 && age <= 35 ? true : APP.errorMessage('Age should be within 14 to 35 years.');
    };

    var validateCity = function (city) {
        if (!city) return;
        $.get('/autocomplites/' + city + '?check=true') // todo
            .done(function (res) {
                return res.city ? true : APP.errorMessage('There is no such city in Ukraine.');
            });
    };

    var validateMatcherAge = function (age) {
        if (!age) return;
        return age >= 14 && age <= 35 ? true : APP.errorMessage('Partner age should be within 14 to 35 years.');
    };

    var validateAvailableTo = function (availableTo) {
        if (!age) return;
        return age >= 14 && age <= 35 ? true : APP.errorMessage('Partner age should be within 14 to 35 years.');
    };

    var validateMatchUser = function (user) {
        if (!user.city || !user.age) {
            return APP.errorMessage('Fill your profile before.');
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

    var validateProfileUser = function (user) {
        if (user.city && !validateCity(user.city)) return;
        if (user.age && !validateAge(user.age)) return;

        return true;
    };

    return {
        age : validateAge,
        city: validateCity,
        matcherAge: validateMatcherAge,
        availableTo: validateAvailableTo,
        matchUser: validateMatchUser,
        profileUser: validateProfileUser
    }
});
