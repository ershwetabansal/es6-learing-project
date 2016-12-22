module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['dots'],
        browsers: ['Chrome'],
        files: [
            'public/js/main.js',
            'tests/**/*Spec.js'
        ],
        preprocessors: {
            'tests/**/*Spec.js': [ 'webpack' ]
        },
        browserify: {
            debug: true,
            transform: [ 'brfs' ]
        },
        webpack: {

        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },
        // plugins to load
        plugins: [
          'karma-jasmine',
          'karma-webpack',
          'karma-chrome-launcher'
        ]
    });
};