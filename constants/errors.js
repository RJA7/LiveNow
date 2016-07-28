var duplicatedKeys = [
    'vkId'
];

module.exports = {
    ERR                 : 'Internal Server Error',
    NOT_FOUND           : 'Sorry, but data not found',
    BAD_REQUEST         : 'Some data is not valid',
    FORBIDDEN           : 'Forbidden',
    UNAUTHORIZED        : 'Unauthorized',
    
    DUPLICATE_FIELD_MESSAGE: 'This {field} is already in use. Please set another {field}',

    ERROR: function (status, message, invalidObj) {
        var err = new Error();
        var errors = [];
        var keysLength;
        var keys;
        var len;
        var i;

        err.message = message || this.ERR;
        err.status = status || 500;

        if (invalidObj) {
            keys = Object.keys(invalidObj);
            keysLength = keys.length;

            for (i = 0, len = keysLength; i < len; i++) {
                errors = errors.concat(invalidObj[keys[i]]);
            }
        }
        err.errors = errors;

        return err;
    },

    MONGO: function (status, err) {
        var self = this;
        var error = new Error();
        var message;

        if (!err) return;

        function parseMongoDuplicateMessage(mes) {
            var duplicateFieldMessage = self.DUPLICATE_FIELD_MESSAGE;
            var len = duplicatedKeys.length;
            var dupField;

            while (len--) {
                if (mes.indexOf(duplicatedKeys[len]) > -1) {
                    dupField = duplicatedKeys[len];
                    break;
                }
            }

            return duplicateFieldMessage.replace(/\{field\}/g, dupField);
        }

        if (err.code === 11000) {
            message = parseMongoDuplicateMessage(err.message);
        }

        error.message = message || err.message;
        error.errors = [];
        error.status = status;

        return error;
    }
};
