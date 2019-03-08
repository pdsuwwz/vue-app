const express = require('express');
const webpack = require('webpack')
const path = require('path');
const app = express();
var config = require('../src/common/config');

let compiler = {}
let webpackConfig = {}

webpackConfig = require(path.join(__dirname, '../build/webpack.dev.conf'))
compiler = webpack(webpackConfig)

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}))
app.use(require("webpack-hot-middleware")(compiler))

app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.static(path.join(__dirname, '../', 'vendor')));
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'public/index.html'));
});

app.listen(config.port);
console.log("Vue App starting on port: %d", config.port);
