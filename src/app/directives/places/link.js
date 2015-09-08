var PlacesLink = function (scope, element, attrs, map) {

    var searchBox = new google.maps.places.SearchBox(element[0]);

    if (map) {

        //map = map.getMap();
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(element[0]);
        map.addPlaces(searchBox);
    }
};

module.exports = PlacesLink;
