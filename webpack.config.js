var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var STYLE_DIR = path.resolve(__dirname, 'src/client/styles');

var config = {
  cache:true,
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    APP_DIR + '/index.js', // Your appʼs entry point,
    STYLE_DIR + '/main.less'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'scripts/bundle.js',
    sourceMapFilename: '[file].map'
  },
  devtool: 'eval',
  module : {
    preLoaders: [

    ],
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loaders : [
          'react-hot', // Here we enable Hot-Module-Reloading for React Components
          'babel'
        ]
      },
      {
        test: /\.jsx?/,
        loader: "eslint",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!less?sourceMap"),
        include: STYLE_DIR
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url?limit=100000&name=fonts/[name].[ext]',
        include: [
          APP_DIR,
          path.resolve(__dirname, 'node_modules/bootstrap/fonts')
        ]
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: __dirname + '/index.html'
    }),
    new ExtractTextPlugin("styles/style.css", {allChunks: false})
  ]
};

module.exports = config;