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

gulp.task('carousel_demo', function() {
    return webpackTask(['src/js/app.js', 'src/js/Carousel.js'], 'carousel_demo.js');
});

gulp.task('vue_demo', function() {
    return webpackTask(['src/js/components/*.js', 'src/js/app_vue.js'], 'vue_demo.js');
});

gulp.task('filter', function() {
    return webpackTask(['src/js/filter_vue.js', 'src/js/Filter.js'], 'filter_vue.js');
});

function webpackTask(source, destFile) {
    return gulp.src(source)
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
                filename: destFile
            }
        }))
        .pipe(gulp.dest('public/js'));
}


gulp.task('browserify', function() {
    return browserify('src/js/Carousel.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['vue_demo', 'carousel_demo', 'filter']);
});

gulp.task('test_watch', function(){
    gulp.watch('src/js/**/*.js', ['test']);
    gulp.watch('tests/**/*.js', ['test']);
});

gulp.task('default', function (callback) {
    runSequence(['vue_demo', 'carousel_demo', 'filter'],
        callback
    );
});