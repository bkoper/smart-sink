var assign = require("lodash").assign;
var fs = require('fs');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");

var config = {
    HOST: "127.0.0.1",
    PORT: 8080,
    BUILD_DIR: "build",
    IMG_DIR: "img"
};

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var webpackBaseConfig = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: /\.scss/, loaders: ["style", "css", "sass"]}
        ]
    },
    devtool: 'source-map'
};

var webpackFrontConfig = assign({}, webpackFrontConfig, webpackBaseConfig, {
    entry: "./frontend/js/main.js",
    output: {
        path: path.join(__dirname, config.BUILD_DIR),
        publicPath: "/",
        filename: "app.entry.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "frontend/static/index_template.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
});

var webpackServerConfig = assign({}, webpackBaseConfig, {
    entry: "./backend/server.js",
    target: "node",
    __dirname: true,
    __filename: true,
    externals: nodeModules,
    output: {
        path: config.BUILD_DIR,
        filename: "server.entry.js",
        publicPath: "/"
    },
    resolve: {
        root: path.join(__dirname),
        fallback: path.join(__dirname, 'node_modules'),
        modulesDirectories: ['node_modules'],
    }
});

module.exports = {
    webpackServerConfig, webpackFrontConfig, config
};