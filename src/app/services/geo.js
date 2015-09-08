var evalAsync = require('app/util/eval-async');

var GeoLocation = function (onSuccess, onError) {

    if (!(this instanceof GeoLocation)) {

        return new GeoLocation(onSuccess, onError);
    }

    this.onSuccess = evalAsync(onSuccess);
    this.onError   = evalAsync(onError);

    this.fetch();
};

GeoLocation.prototype.fetch = function () {

    navigator
        .geolocation
        .getCurrentPosition(this.onSuccess, this.onError);
};

module.exports = GeoLocation;
