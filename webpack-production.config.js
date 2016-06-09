var webpack = require('webpack');
var path = require('path');

var devConfig = require('./webpack.config.js');
var BUILD_DIR = path.resolve(__dirname, 'dist');

var CleanWebpackPlugin = require('clean-webpack-plugin');

devConfig.devtool = 'cheap-module-source-map';

// Remove the Hot Module Replacement entry points
devConfig.entry.splice(0,2);

// Remove the HMR plugin
devConfig.plugins.splice(1, 1);

// Add code optimisations
devConfig.plugins = devConfig.plugins.concat([
  new CleanWebpackPlugin(BUILD_DIR),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.optimize.DedupePlugin()
]);

module.exports = devConfig;