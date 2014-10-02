var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

require('gulp-help')(gulp);

var paths = {
	scripts: [
		'gulpfile.js',
		'www/js/*.js'
	],
	www: [
		'www/index.html',
		'www/**/*.{css,js,png}'
	]
};

gulp.task('jshint', 'Lint all Javascript files.', function() {
  return gulp.src(paths.scripts)
	  .pipe(plugins.jshint('.jshintrc'))
	  .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('watch', 'Watch files and excecute -> [jshint, cordova:prepare]', function() {
  gulp.watch(paths.scripts, ['jshint']);
  gulp.watch(paths.www, ['cordova:prepare']);
});

gulp.task('cordova:prepare', 'Copies files for all platforms so that the project is ready to build with each SDK', function (done) {

	var path = require('path');
	var spawn = require('child_process').spawn;

  var cmd = path.resolve('./node_modules/cordova/bin', 'cordova');
  var child = spawn(cmd, ['prepare']);

  child.stdout.on('data', function (data) {
    console.log.writeln(data);
  });
  child.stderr.on('data', function (data) {
    console.log.error(data);
  });
  child.on('close', function (code) {
    done(code);
  });

});