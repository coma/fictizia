var gulp = require('gulp'),
    del  = require('del'),
    dir  = {
        web         : __dirname + '/web',
        src         : __dirname + '/src',
        app         : __dirname + '/src/app',
        style       : __dirname + '/src/style/app.styl',
        styles      : __dirname + '/src/style/**',
        assets      : __dirname + '/src/assets/**',
        logs        : __dirname + '/logs',
        server      : __dirname + '/server.js',
        dependencies: __dirname + '/node_modules'
    };

gulp.task('clean', function (done) {

    del('web/!(.gitkeep)', done);
});

gulp.task('assets', function () {

    return gulp
        .src(dir.assets)
        .pipe(gulp.dest(dir.web));
});

gulp.task('deploy', function (done) {

    require('./gulp/deploy')(dir, done);
});

gulp.task('default', function (done) {

    require('./gulp/default')(dir, done);
});
