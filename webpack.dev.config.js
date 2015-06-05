var file = require("file");
var webpack = require("webpack");
var cordovaConfig = {};
var modules = [];
var fallbacks = [];
modules.push("node_modules");
file.walkSync("./src", function(dirPath, dirs, files) {
    modules = modules.concat(dirs);
    fallbacks.push(file.path.abspath(dirPath));
});



module.exports = {
    // webpack options
    module: {
        loaders: [ // required for react jsx
            {
                test: /\.js$/,
                loader: "jsx-loader?harmony"
            }, {
                test: /\.jsx$/,
                loader: "jsx-loader?harmony"
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
            }
        ]
    },
    plugins: [
    ],
    resolve: {
        modulesDirectories: modules,
        fallback: fallbacks
    },
    entry: "./src/js/main.js",
    output: {
        path: require("path").resolve("./build"),
        filename: "bundle.js"
    },
    externals: {
        "window": "window",
        "document": "document"
    }
};
