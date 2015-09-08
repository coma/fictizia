var di = require('./di');

module.exports = function (func) {

    return function () {

        var args = arguments;

        di('$rootScope').$evalAsync(function () {

            func.apply(func, args);
        });
    };
};
