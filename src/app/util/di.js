var angular = require('angular');

module.exports = function (name) {

    return angular
        .element(document.body)
        .injector()
        .get(name);
};
