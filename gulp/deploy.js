var gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    uglify       = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sequence     = require('run-sequence'),
    browserify   = require('browserify'),
    ngAnnotate   = require('gulp-ng-annotate'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer');

module.exports = function (dir, done) {

    gulp.task('script', function () {

        return browserify({
                entries: [dir.app],
                paths  : [dir.dependencies, dir.src]
            })
            .bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest(dir.web));
    });

    gulp.task('style', function () {

        return gulp
            .src(dir.style)
            .pipe(stylus({
                compress: true
            }))
            .pipe(autoprefixer())
            .pipe(gulp.dest(dir.web));
    });

    sequence('clean', ['assets', 'script', 'style'], done);
};
