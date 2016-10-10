'use strict';
var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  less = require('gulp-less'),
  livereload = require('gulp-livereload'),
  ghPages = require('gulp-gh-pages');

gulp.task('less', function () {
  return gulp.src('less/*.less')
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

gulp.task('default', ['less', 'watch']);