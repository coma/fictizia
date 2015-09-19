var app = angular.module('app', []);

app.controller('mundo', function ($q, $timeout) {

	var voto = $q.defer();
	
	this.votar = function () {

		voto.resolve();
	};

	$q
		.all([voto.promise, $timeout(angular.noop, 5000)])
		.then(function () {

			alert('votaciones');
		});
});