'use strict';

define(['toastr'], function (toastr) {
    return {
        alert: function (mode, message) {
            // setup messenger settings
            toastr.options = {
                debug            : true,
                onclick          : null,
                timeOut          : '5000',
                showEasing       : 'swing',
                hideEasing       : 'linear',
                showMethod       : 'fadeIn',
                hideMethod       : 'fadeOut',
                closeButton      : true,
                progressBar      : false,
                newestOnTop      : false,
                showDuration     : '300',
                hideDuration     : '1000',
                positionClass    : 'toast-top-center',
                extendedTimeOut  : '1000',
                preventDuplicates: true
            };
            // show message
            toastr[mode](message);
        }
    };
});
