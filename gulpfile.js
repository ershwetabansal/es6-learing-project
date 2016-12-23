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
    return gulp.src(['src/js/app.js', 'src/js/Carousel.js'])
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
                filename: 'carousel_demo.js'
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('vue_demo', function() {
    return gulp.src(['src/js/components/*.js', 'src/js/app_vue.js'])
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
                filename: 'vue_demo.js'
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('filter', function() {
    return gulp.src(['src/js/filter_vue.js', 'src/js/Filter.js'])
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
                filename: 'filter_vue.js'
            }
        }))
        .pipe(gulp.dest('public/js'));
});



gulp.task('browserify', function() {
    return browserify('src/js/Carousel.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['browserify', 'vue_demo', 'carousel_demo', 'filter']);
});

gulp.task('test_watch', function(){
    gulp.watch('src/js/**/*.js', ['test']);
    gulp.watch('tests/**/*.js', ['test']);
});

gulp.task('default', function (callback) {
    runSequence(['browserify', 'vue_demo', 'carousel_demo', 'filter'],
        callback
    );
});