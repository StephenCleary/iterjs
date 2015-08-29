var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var jsdoc = require('gulp-jsdoc-to-markdown');
require('babel/register');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('test', function () {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({ bail: true }));
});

gulp.task('doc', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(jsdoc())
        .pipe(concat('api.md'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['lint', 'doc', 'test'], function () {
});