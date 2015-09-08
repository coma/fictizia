module.exports = {
    scope   : {
        moment: '=',
        delay : '='
    },
    restrict: 'E',
    replace : true,
    template: require('./template.html'),
    link    : require('./link')
};