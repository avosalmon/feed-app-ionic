var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sh = require('shelljs');

gulp.task('default', ['watch-sass', 'watch-js-concat', 'watch-js-uglify']);

// exec tasks
gulp.task('sass', function(done) {
    gulp.src('scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('www/dist/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('www/dist/css'))
        .on('end', done);
});

gulp.task('concat-js', function(done) {
    gulp.src(['www/src/**/boot.js', 'www/src/**/*.js', '!www/src/**/*_test.js'])
        .pipe(concat('main.js', {newLine: '\n\n\n'}))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

gulp.task('uglify-js', function(done) {
    gulp.src('www/dist/js/main.js')
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

// watch tasks
gulp.task('watch-sass', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('watch-js-concat', function() {
    gulp.watch('www/src/**/*.js', ['concat-js']);
});

gulp.task('watch-js-uglify', function() {
    gulp.watch('www/dist/js/main.js', ['uglify-js']);
});
