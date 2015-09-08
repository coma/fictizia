var getStorage = function (type) {

    var storage =  {
        has   : function (name) {

            return window[type].getItem(name) !== null;
        },
        get   : function (name) {

            return JSON.parse(window[type].getItem(name));
        },
        set   : function (name, data) {

            window[type].setItem(name, JSON.stringify(data));

            return storage;
        },
        remove: function (name) {

            window[type].removeItem(name);

            return storage;
        },
        clear: function () {

            window[type].clear();

            return storage;
        }
    };

    return storage;
};

module.exports = {
    session: getStorage('sessionStorage'),
    local  : getStorage('localStorage')
};
