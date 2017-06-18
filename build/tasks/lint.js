'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var gulpConfig = require('./../gulp-config');

gulp.task('tslint', function () {
    return gulp.src(gulpConfig.appTypescript)
        .pipe(tslint({
            formatter: 'verbose',
            rulesDirectory: 'node_modules/tslint-microsoft-contrib',
        }))
        .pipe(tslint.report());
});