'use strict';

var path = require('path');
var ROOT_DIR = __dirname;

module.exports = {
  devtool: 'eval',
  entry: [path.resolve(ROOT_DIR, 'client', 'js', 'app.es6.js')],
  output: {
    path: path.join(ROOT_DIR, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.es6.js$/,
      loader: 'babel',
      exclude: path.join(ROOT_DIR, 'node_modules')
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.es6.js'],
    alias: {
      styles: path.resolve(ROOT_DIR, 'client', 'styles'),
      js: path.resolve(ROOT_DIR, 'client', 'js')
    }
  }
};
