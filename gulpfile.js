var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');

var Server = require('karma').Server;

gulp.task('test', function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('webpack', function() {
    return gulp.src('src/js/*.js')
        .pipe(webpack({
            module: {
                loaders: [{
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            output: {
                filename: 'main.js'
            }
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browserify', function() {
    return browserify('src/js/Carousel.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['browserify', 'webpack']);
});

gulp.task('test_watch', function(){
    gulp.watch('src/js/**/*.js', ['test']);
    gulp.watch('tests/**/*.js', ['test']);
});

gulp.task('default', function (callback) {
    runSequence(['browserify', 'webpack'],
        callback
    );
});