const _ = require("lodash");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs");
const path = require("path");
const BUILD_DIR = "build";

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter( x => ['.bin'].indexOf(x) === -1 )
    .forEach( mod => nodeModules[mod] = 'commonjs ' + mod);

const serverConfig = {
    entry: "./backend/server.js",
    externals: nodeModules,
    resolve: {
        root: path.join(__dirname),
        fallback: path.join(__dirname, 'node_modules')
    },
    target: "node"
};

const uiConfig = {
    entry: {
        app:  "./frontend/js/main.js",
        vendor: ['react', 'react-dom', 'events', 'socket.io-client', 'bootstrap', 'chart.js', 'lodash', 'jquery']
    },
    target: "web",
    plugins: _.compact([
        new HtmlWebpackPlugin({
            template: "./frontend/static/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ])
};

module.exports = env => {
    const filename  = env.server ? "server.entry.js" : "app.[name].[hash].js";

    const config = {
        output: {
            path: BUILD_DIR,
            filename,
            pathinfo: false
        },
        bail: true,
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel",
                    query: {
                        presets: ["es2015", "react", "stage-2"]
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
        devtool: env.prod ? "eval" : "source-map"
    };

    return Object.assign(config, env.server ? serverConfig : uiConfig);
};
