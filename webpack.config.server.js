var webpack = require('webpack');
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var nodeExternals = require('webpack-node-externals');


var config = {
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true,
    __filename: true,
  },
  entry: './backend/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules',
      'frontend'
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
					babelrc: false,
          presets: [['es2015', {modules: false}], 'react'],
          plugins: ["transform-decorators-legacy", "transform-ensure-ignore"]
        }
      }]
    }]
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
}

module.exports = config
