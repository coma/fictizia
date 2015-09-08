module.exports = {
    scope     : {
        name  : '@',
        locate: '='
    },
    restrict  : 'E',
    replace   : true,
    transclude: true,
    template  : require('./template.html'),
    link      : require('./link'),
    controller: require('./controller')
};