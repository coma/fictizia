var io     = require('socket.io-client'),
    config = require('app/config');

module.exports = io(config('host'), {
    transports : ['websocket']
});
