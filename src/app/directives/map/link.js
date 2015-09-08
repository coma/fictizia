var config      = require('app/config')('map'),
    GeoLocation = require('app/services/geo'),
    session     = require('app/services/storage').session,
    maps        = session.get('maps') || {};

var MapLink = function (scope, element) {

    if (!(this instanceof MapLink)) {

        return new MapLink(scope, element);
    }

    var settings = maps[scope.name] || config;
    settings.disableDefaultUI = true;

    this.name = scope.name;
    this.map = new google.maps.Map(element[0].querySelector('.d-map-map'), settings);

    if (!maps[scope.name] && scope.locate) {

        GeoLocation(this.onSuccess.bind(this), this.onError.bind(this));
    }

    this.map.addListener('zoom_changed', this.storeOnSession.bind(this));
    this.map.addListener('center_changed', this.storeOnSession.bind(this));

    scope.setMap(this.map);
};

MapLink.prototype.storeOnSession = function () {

    var center = this.map.getCenter();

    maps[this.name] = {
        zoom  : this.map.getZoom(),
        center: {
            lat: center.lat(),
            lng: center.lng()
        }
    };

    session.set('maps', maps);
};

MapLink.prototype.setCenter = function (center) {

    this.map.panTo(center);
};

MapLink.prototype.setZoom = function (zoom) {

    this.map.setZoom(zoom);
};

MapLink.prototype.onSuccess = function (position) {

    maps[this.name] = {
        zoom  : 14,
        center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    };

    this.setCenter(maps[this.name].center);
    this.setZoom(maps[this.name].zoom);
    session.set('maps', maps);
};

MapLink.prototype.onError = function (error) {

    console.error(error);
};

module.exports = MapLink;
