var gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    watch        = require('gulp-watch'),
    livereload   = require('gulp-livereload'),
    open         = require('gulp-open'),
    del          = require('del'),
    sequence     = require('run-sequence'),
    browserify   = require('browserify'),
    watchify     = require('watchify'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
    Forever      = require('forever-monitor').Monitor;

var plumberConfig = {
    errorHandler: function (error) {

        notify.onError({
            title   : 'Error',
            subtitle: error.plugin,
            message : error.message,
            sound   : 'Pop'
        })(error);

        this.emit('end');
    }
};

module.exports = function (dir, done) {

    var watched = watchify(browserify({
        entries     : [dir.app],
        paths       : [dir.dependencies, dir.src],
        debug       : true,
        cache       : {},
        packageCache: {},
        fullPaths   : true
    }));

    var bundle = function () {

        return watched
            .bundle()
            .on('log', console.log)
            .on('error', plumberConfig.errorHandler)
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulp.dest(dir.web))
            .pipe(livereload());
    };

    watched.on('update', bundle);
    watched.on('error', plumberConfig.errorHandler);
    watched.on('log', console.log);

    gulp.task('script', bundle);

    gulp.task('style', function () {

        return gulp
            .src(dir.style)
            .pipe(plumber(plumberConfig))
            .pipe(stylus())
            .pipe(gulp.dest(dir.web))
            .pipe(livereload());
    });

    gulp.task('watch', function () {

        livereload.listen();

        watch(dir.styles, function () {

            sequence('style');
        });

        watch(dir.assets, function () {

            sequence('assets');
        });

        watch(dir.src + '/(auth|server)/**', function () {

            forever.restart();
        });
    });

    gulp.task('run', function (done) {

        var forever = new Forever(dir.server, {
            silent : true,
            outFile: dir.logs + '/out.log',
            errFile: dir.logs + '/error.log',
            pidFile: dir.logs + '/pid'
        });

        forever.on('start', function () {

            done();
        });

        forever.start();
    });

    gulp.task('open', function () {

        return gulp
            .src('')
            .pipe(open({
                uri: 'http://localhost:5000'
            }));
    });

    sequence('clean', ['assets', 'script', 'style'], 'run', 'watch', 'open', done);
};
