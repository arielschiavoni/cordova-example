var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src(['gulpfile.js'])
	  .pipe(jshint('.jshintrc'))
	  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['jshint']);