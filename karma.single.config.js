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
        singleRun: true,
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
                loaders: [ // required for react jsx
                    {
                        test: /\.js$/,
                        loader: "jsx-loader?harmony",
                        exclude: /node_modules/ // because chai is not compatable with 'use-strict'

                    }, {
                        test: /\.jsx$/,
                        loader: "jsx-loader?harmony",
                        exclude: /node_modules/ // because chai is not compatable with 'use-strict'

                    }, {
                        test: /\.css$/,
                        loader: "style-loader!css-loader"
                    }, {
                        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&minetype=application/font-woff"
                    }, {
                        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&minetype=application/font-woff"
                    }, {
                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&minetype=application/octet-stream"
                    }, {
                        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "file"
                    }, {
                        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&minetype=image/svg+xml"
                    },
                ]
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
