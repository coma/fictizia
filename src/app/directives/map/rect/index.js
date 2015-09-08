module.exports = {
    restrict: 'A',
    require : 'map',
    priority: 1,
    link    : require('./link')
};