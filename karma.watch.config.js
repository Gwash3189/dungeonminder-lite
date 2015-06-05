var webpack = require('webpack');
var RewirePlugin = require("rewire-webpack");
var file = require('file');
var modules = [];
var fallbacks = [];
file.walkSync("./src", function(dirPath, dirs, files) {
    modules = modules.concat(dirs);
    fallbacks.push(file.path.abspath(dirPath));
});
modules.push("node_modules");


module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: false,
        autoWatch: true,
        frameworks: ['mocha'],
        files: [
            'entry.tests.js'
        ],
        preprocessors: {
            'entry.tests.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'jsx-loader?harmony=true',
                }, ]
            },
            externals: {
                "window": "window",
                "document": "document"
            },
            plugins: [
                new RewirePlugin()
            ],
            resolve: {
                modulesDirectories: modules,
                fallback: fallbacks
            },
        },
        webpackServer: {
            noInfo: true
        }
    });
};
