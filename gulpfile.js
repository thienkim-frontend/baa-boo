'use strict';
var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  watchLess = require('gulp-watch-less'),
  less = require('gulp-less'),
  livereload = require('gulp-livereload'),
  ghPages = require('gulp-gh-pages');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var jsFiles = 'js/lib/*.js',  
    jsDest = 'js',
    cssFiles = 'css/plugin/*.css',  
    cssDest = 'css';
gulp.task('less', function () {
  return gulp.src('less/style.less')
    .pipe(watchLess('less/style.less'))
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
}); 
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
});
gulp.src('less/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest('css'));
gulp.task('deploy', function() {
  return gulp.src('**/*')
    .pipe(ghPages());
});
gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(jsDest))
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
});
gulp.task('uglifycss', function() {  
    return gulp.src(cssFiles)
      .pipe(concat('plugin.css'))
      .pipe(gulp.dest(cssDest))
      .pipe(rename('plugin.min.css'))
      .pipe(uglifycss())
      .pipe(gulp.dest(cssDest));
});
gulp.task('default', ['less']);