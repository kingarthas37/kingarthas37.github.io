'use strict';

var gulp = require('gulp');
var fs = require('fs');
var onlyScripts = require('./util/script-filter');
var tasks = fs.readdirSync('gulp/task').filter(onlyScripts);
var minimist = require('minimist');

tasks.forEach(function(task) {
    require('./task/' + task);
});

var args = minimist(process.argv.slice(2), {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'dev'}
});

if(args.env === 'dev') {
    //dev task
    //gulp.task('default', ['sprite','css','browserify','watch']);
    gulp.task('default', ['css-common','css','browserify','watch']);
} else if(args.env === 'prod') {
    //build task
   // gulp.task('default', ['clean','sprite','css:dist','browserify:dist']);
    gulp.task('default', ['css-common','css:dist','browserify:dist']);
}