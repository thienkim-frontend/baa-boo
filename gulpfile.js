'use strict';
var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  watchLess = require('gulp-watch-less'),
  less = require('gulp-less'),
  livereload = require('gulp-livereload'),
  ghPages = require('gulp-gh-pages');
var lessImport = require('gulp-less-import');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var jsFiles = 'source/js/lib/*.js',  
    jsDest = 'public/js',
    cssFiles = 'source/css/plugin/*.css',  
    cssDest = 'public/css';
var path = require('path');
gulp.task('less', function () {
  return gulp.src('source/less/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('public/css'));
}); 
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('source/less/**/*.less', ['less']);
});

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
gulp.task('deploy', function() {
  return gulp.src('public/**/*')
    .pipe(ghPages());
});
// gulp.task('default', ['less', 'deploy']);
gulp.task('default', ['less']);