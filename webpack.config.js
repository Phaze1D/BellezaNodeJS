var webpack = require('webpack');
var path = require('path');


var config = {
  entry: './frontend/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
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
          presets: [['es2015', {modules: false}], 'react'],
          plugins: ["transform-decorators-legacy"]
        }
      }]
    },{
      test: /\.(scss|css)$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },{
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }]
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
}

module.exports = config
