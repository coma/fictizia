var angular    = require('angular'),
	router     = require('angular-ui-router'),
	directives = require('./directives');

var app = angular.module('app', [router, directives]);

/*@ngInject*/
app.config(function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
        .state('app', require('./states'))
        .state('app.map', require('./states/map'))
        .state('app.favourites', require('./states/favourites'))
        .state('app.settings', require('./states/settings'));
});

window.onGoogleLoad = function () {

    angular.bootstrap(document.body.parentNode, ['app']);
};