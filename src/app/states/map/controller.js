var socket    = require('app/services/socket'),
    evalAsync = require('app/util/eval-async'),
    moment    = require('moment');

/*@ngInject*/
var MapController = function ($scope) {

    $scope.$on('bounds.changed', this.onBoundsChange.bind(this));
    $scope.$on('bounds.removed', this.onBoundsRemove.bind(this));
    $scope.$on('$destroy', this.onBoundsRemove.bind(this));

    socket.on('tweet', evalAsync(this.onTweet.bind(this)));
};

MapController.prototype.onBoundsChange = function (event, bounds) {

    this.tweets = [];
    socket.emit('on', bounds.toUrlValue());
};

MapController.prototype.onBoundsRemove = function () {

    this.tweets = null;
    socket.off('on');
    socket.emit('off');
};

MapController.prototype.onTweet = function (tweet) {

    if (this.tweets) {

        this.tweets.unshift({
            id    : tweet.id,
            text  : tweet.text,
            moment: moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en')
        });
    }
};

module.exports = MapController;
