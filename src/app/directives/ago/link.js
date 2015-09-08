var di = require('app/util/di');

var AgoLink = function (scope) {

    var timeout = di('$timeout'),
        current = null;

    var refresh = function () {

        scope.text = scope.moment.fromNow();
        current = timeout(refresh, scope.delay ||  60000);
    };

    scope.$on('$destroy', function () {

        timeout.cancel(current);
    });

    refresh();
};

module.exports = AgoLink;
