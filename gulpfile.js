var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var jsdoc = require('gulp-jsdoc-to-markdown');
require('babel/register');

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

gulp.task('default', ['doc', 'test'], function () {
});