var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  less = require('gulp-less'),
  watch = require('gulp-watch'),
  path = require('path'),
  var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);

gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
}); 
gulp.src('./less/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./css'));
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
gulp.task('default', ['less']);