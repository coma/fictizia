var copy = require('app/util/copy');

var config = {
    host   : location.protocol + '//' + location.host,
    map    : {
        center: {
            lat: 40.415363,
            lng: -3.707398
        },
        zoom  : 14
    },
    drawing: {
        drawingControl       : true,
        drawingControlOptions: {
            position    : google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [
                google.maps.drawing.OverlayType.RECTANGLE
            ]
        },
        rectangleOptions     : {
            strokeWeight: 1,
            draggable   : true,
            editable    : true,
            fillColor   : '#6097ff',
            strokeColor : '#6097ff'
        }
    }
};

module.exports = function (name) {

    return copy(config[name]);
};