module.exports = function(config) {
    config.set({
        frameworks: ['browserify','jasmine'],
        reporters: ['dots'],
        browsers: ['Chrome'],
        files: [
            'public/js/app.js',
            'tests/**/*Spec.js'
        ],
        preprocessors: {
            'tests/**/*Spec.js': [ 'browserify' ]
        },
        browserify: {
            debug: true,
            transform: [ 'brfs' ]
        },
        // plugins to load
        plugins: [
          'karma-jasmine',
          'karma-browserify',
          'karma-chrome-launcher'
        ]
    });
};