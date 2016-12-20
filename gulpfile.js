var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');

var Server = require('karma').Server;

gulp.task('test', function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('browserify', function() {
    return browserify('src/js/Carousel.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['browserify']);
});

gulp.task('test_watch', function(){
    gulp.watch('src/js/**/*.js', ['test']);
    gulp.watch('tests/**/*.js', ['test']);
});

gulp.task('default', function (callback) {
    runSequence(['browserify'],
        callback
    );
});