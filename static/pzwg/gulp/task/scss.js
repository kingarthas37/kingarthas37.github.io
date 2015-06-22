'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var path = require('path');
var minimist = require('minimist');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

var config = require('../../package.json');


// css common
gulp.task('css-common',function() {
    return gulp.src(config.path.base + '/css/*.css')
        .pipe(concat(config.name + '.external.css'))
        .pipe(gulp.dest(config.path.cssDist));
});



// css pages
gulp.task('css', function () {
    return gulp.src(path.join(config.path.cssDev,'main.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename(config.name + '.pages.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(gulp.dest(config.path.cssDist));
});




// css pages dist
gulp.task('css:dist', function () {
    
    var md5 = minimist(process.argv.slice(2)).md5 || false;
    
    return gulp.src(path.join(config.path.cssDev,'main.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename(config.name + '.pages.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(gulpif(md5,rev()))
        .pipe(gulp.dest(config.path.cssDist))
        .pipe(gulpif(md5,rev.manifest({merge: true})))
        .pipe(gulpif(md5,gulp.dest(path.join(config.path.base,'dist'))));
    
});