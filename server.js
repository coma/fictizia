process.env['NODE_PATH'] = __dirname + '/src';
require('module').Module._initPaths();

var config  = require('./config'),
    fs      = require('fs'),
    path    = require('path'),
    express = require('express'),
    app     = express(),
    server  = require('http').Server(app),
    io      = require('socket.io')(server),
    Twit    = require('twit');

var twit = new Twit(config.twitter);

app.use(express.static(path.join(__dirname, '/web'), {
    index: 'index.html'
}));

io.sockets.on('connection', function (socket) {

    var stream;

    var stop = function () {

        if (stream) {

            stream.stop();
            stream = null;
        }
    };

    socket.on('on', function (locations) {

        stop();

        var a = locations.split(',');

        stream = twit.stream('statuses/filter', {
            locations: [a[1], a[0], a[3], a[2]].join(',')
        });

        stream.on('tweet', function(tweet) {

            socket.emit('tweet', tweet);
        });

        stream.on('error', function(error) {

            socket.emit('error', error);
        });
    });

    socket.on('off', stop);
    socket.on('disconnect', stop);
});

var html = fs.readFileSync(path.join(__dirname, 'web', 'index.html'), {
    encoding: 'utf8'
});

app.get('*', function (req, res) {

    res
        .set('Content-Type', 'text/html')
        .send(html);
});

server.listen(config.port);
