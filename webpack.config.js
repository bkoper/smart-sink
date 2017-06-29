const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BUILD_PATH = path.resolve(__dirname, "./build/");
const SERVER_PATH = path.resolve(__dirname, "./server-side/server.js");
const UI_PATH = path.resolve(__dirname, "./ui/js/main.js");

const serverConfig = {
    entry: SERVER_PATH,
    output: {
        path: BUILD_PATH,
        filename: "server.entry.js"
    },
    target: "node",
    externals: nodeExternals()
};

const uiConfig = prod => {
    const ifProd = object => prod && object;
    const vendors = ["react", "react-dom", "events", "socket.io-client", "bootstrap", "chart.js", "lodash", "jquery"];

    return {
        entry: {
            main: UI_PATH,
            vendor: vendors
        },
        output: {
            path: BUILD_PATH,
            filename: "smartsink.[name][hash].js"
        },
        target: "web",
        plugins: _.compact([
            new HtmlWebpackPlugin({
                template: "./ui/static/index.html"
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: vendors.concat("manifest")
            }),
            ifProd(new webpack.optimize.DedupePlugin()),
            ifProd(new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })),
            ifProd(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true, // eslint-disable-lin
                    warnings: false
                }
            }))
        ])
    }
};

module.exports = env => {
    const config = {
        resolve: {
            modules: ["node_modules"],
            descriptionFiles: ["package.json"]
        },
        module: {
            rules: [
                {
                    test: /(.js|.jsx)/,
                    loader: "babel-loader",
                    exclude: path.resolve(__dirname, "node_modules"),
                    options: {
                        presets: ["es2015", "react", "stage-2"]
                    }
                },
                {test: /\.css$/, use: ["style-loader", "css-loader"]},
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader"},
                {test: /\.(woff|woff2)$/, use: "url-loader?prefix=font/&limit=5000"},
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream"},
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml"},
                {test: /\.scss/, use: ["style-loader", "css-loader", "sass-loader"]}
            ]
        }
    };
    return Object.assign(config, env.server ? serverConfig : uiConfig(env.prod));
};
