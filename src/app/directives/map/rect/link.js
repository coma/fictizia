var config = require('app/config')('drawing');

var RectLink = function (scope, element, attrs, map) {

    if (!(this instanceof RectLink)) {

        return new RectLink(scope, element, attrs, map);
    }

    this.scope   = scope;
    this.current = null;
    this.manager = new google.maps.drawing.DrawingManager(config);

    this.manager.setMap(map.getMap());
    google.maps.event.addListener(this.manager, 'drawingmode_changed', this.onDrawingModeChange.bind(this));
    google.maps.event.addListener(this.manager, 'rectanglecomplete', this.onRectangleComplete.bind(this));
};

RectLink.prototype.emit = function (name, data) {

    var scope = this.scope;

    scope.$evalAsync(function () {

        scope.$emit('bounds.' + name, data);
    });
};

RectLink.prototype.emitBounds = function () {

    this.emit('changed', this.current.getBounds());
};

RectLink.prototype.removeBounds = function () {

    if (this.current) {

        this.current.setMap(null);
        this.current = null;
        this.emit('removed');
    }
};

RectLink.prototype.onRectangleComplete = function (rectangle) {

    this.manager.setDrawingMode(null);
    this.current = rectangle;

    rectangle.addListener('bounds_changed', this.emitBounds.bind(this));
    this.emitBounds();
};

RectLink.prototype.onDrawingModeChange = function () {

    if (this.manager.getDrawingMode() === google.maps.drawing.OverlayType.RECTANGLE) {

        this.removeBounds();
    }
};

module.exports = RectLink;
