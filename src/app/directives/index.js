var angular = require('angular'),
    mod     = angular.module('app.directives', []);

mod
    .directive('map', function () {

        return require('./map');
    })
    .directive('mapRect', function () {

        return require('./map/rect');
    })
    .directive('places', function () {

        return require('./places');
    })
    .directive('ago', function () {

        return require('./ago');
    });

module.exports = mod.name;