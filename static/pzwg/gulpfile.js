var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('default',['css','images','watch']);


gulp.task('css', function () {
    
//    gulp.src('public/js/*.js')
//        .pipe(uglify())
//        .pipe(concat('app.js'))
//        .pipe(gulp.dest('dist'));
     
    gulp.src('./public/dev/css/main.scss')
       // .pipe(sourcemaps.init())
        .pipe(sass())
     //   .pipe(minifyCss())
        .pipe(concat('index.css'))
        .pipe(rename({suffix: '.min'}))
     //   .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/css'));
        
     
    
    
});


gulp.task('images',function() {
    gulp.src('./public/dev/images/*.png')
     //   .pipe(imagemin({
      //      progressive: true,
       //     svgoPlugins: [{removeViewBox: false}],
       //     use: [pngquant()]
      //  }))
        .pipe(gulp.dest('./public/dist/images'));
});




gulp.task('watch', function() {
    gulp.watch('./public/dev/css/*.scss',['css']);
    gulp.watch('./public/dev/images/*.png',['images']);
});