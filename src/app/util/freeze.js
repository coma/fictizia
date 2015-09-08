var freeze = function (obj) {

    // Retrieve the property names defined on obj
    var propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(function (name) {

        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop === 'object' && !Object.isFrozen(prop)) {

            freeze(prop);
        }
    });

    // Freeze self
    return Object.freeze(obj);
};

module.exports = freeze;
