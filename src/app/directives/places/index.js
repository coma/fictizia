module.exports = {
    restrict: 'E',
    require : '?^map',
    replace : true,
    template: require('./template.html'),
    link    : require('./link')
};