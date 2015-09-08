/*@ngInject*/
var MapController = function ($scope) {

    if (!(this instanceof MapController)) {

        return new MapController($scope);
    }

    $scope.setMap = this.setMap.bind(this);
    $scope.name = $scope.name || 'default';
};

MapController.prototype.setMap = function (map) {

    this.map = map;

    if (this.places) {

        var searchBox = this.places;

        map.addListener('bounds_changed', function () {

            searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', function () {

            var places = searchBox.getPlaces();

            if (!places.length) {

                return;
            }

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (place) {

                if (place.geometry.viewport) {

                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);

                } else {

                    bounds.extend(place.geometry.location);
                }
            });

            map.fitBounds(bounds);
        });
    }
};

MapController.prototype.getMap = function () {

    return this.map;
};

MapController.prototype.addPlaces = function (places) {

    this.places = places;
};

module.exports = MapController;
