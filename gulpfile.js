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
var jslibs = [
    'bower_components/firebase/firebase.js',
    'bower_components/angularfire/dist/angularfire.min.js'
];

gulp.task('default', [
    'watch-sass',
    'watch-concat-js-main',
    'watch-uglify-js-main',
    'watch-concat-js-lib',
    'watch-uglify-js-lib'
]);

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

gulp.task('concat-js-main', function(done) {
    gulp.src(['www/src/**/boot.js', 'www/src/**/*.js', '!www/src/**/*_test.js'])
        .pipe(concat('main.js', {newLine: '\n\n\n'}))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

gulp.task('uglify-js-main', function(done) {
    gulp.src('www/dist/js/main.js')
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

gulp.task('concat-js-lib', function(done) {
    gulp.src(jslibs)
        .pipe(concat('dependencies.js', {newLine: '\n\n\n'}))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

gulp.task('uglify-js-lib', function(done) {
    gulp.src('www/dist/js/dependencies.js')
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('dependencies.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

// watch tasks
gulp.task('watch-sass', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('watch-concat-js-main', function() {
    gulp.watch('www/src/**/*.js', ['concat-js-main']);
});

gulp.task('watch-uglify-js-main', function() {
    gulp.watch('www/dist/js/main.js', ['uglify-js-main']);
});

gulp.task('watch-concat-js-lib', function() {
    gulp.watch(jslibs, ['concat-js-lib']);
});

gulp.task('watch-uglify-js-lib', function() {
    gulp.watch('www/dist/js/dependencies.js', ['uglify-js-lib']);
});
