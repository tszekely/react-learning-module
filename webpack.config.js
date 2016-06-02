var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    APP_DIR + '/index.jsx' // Your appʼs entry point
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loaders : [
          'react-hot', // Here we enable Hot-Module-Reloading for React Components
          'babel'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: __dirname + '/index.html'
    })
  ]
};

module.exports = config;