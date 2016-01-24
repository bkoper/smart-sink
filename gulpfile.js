var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var del = require("del");
var path = require("path");
var fs = require('fs');
var argv = require("yargs").argv;
var assign = require("lodash").assign;
var WebpackDevServer = require("webpack-dev-server");

var webpackFrontConfig = require("./webpack.config.base").webpackFrontConfig;
var webpackServerConfig = require("./webpack.config.base").webpackServerConfig;
var config = require("./webpack.config.base").config;

gulp.task("clean", function () {
    del(path.join(config.BUILD_DIR, "/", "*"));
});

gulp.task("copyStatics", ["clean"], function() {
   gulp.src("./frontend/static/img/*").pipe(gulp.dest(path.join(config.BUILD_DIR, "img")));
});

gulp.task("build", ["copyStatics"], function (done) {
    var config = argv.server ? webpackServerConfig : webpackFrontConfig;
    var webpackCallback = function (err, stats) {
        console.log(err ? "Error: " + err : stats.toString());
        done();
    };

    argv.watch ? webpack(config).watch(webpackCallback)
        : webpack(config).run(webpackCallback);
});

gulp.task("webpack-dev-server", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackFrontConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    myConfig.entry = [
        myConfig.entry,
        'webpack-dev-server/client?http://' + config.HOST + ':' + config.PORT,
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
    ];

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        stats: {
            colors: true
        },
        contentBase: path.join(__dirname, "build"),
        hot: true
    }).listen(config.PORT, config.HOST, function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:8080/index.html");
        });
});

gulp.task("live", ["webpack-dev-server"]);