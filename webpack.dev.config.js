var webpack = require('webpack');
var path = require('path');


var config = {
  entry: 'frontend/index.jsx',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      'node_modules',
      'frontend'
    ],
    extensions: ['.js', '.jsx', '.scss', '.sass']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}], 'react', 'stage-0'],
          plugins: ["transform-decorators-legacy"]
        }
      }]
    },{
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
}
