const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  source: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
};

module.exports = {
  entry: {
    'main': [
      'babel-polyfill',
      paths.source + '/index.js'
    ]
  },
  output: {
    path: paths.build,
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(gif|png|jpg|jpeg|svg)$/,
      exclude: [/node_modules/, /build/],
      loader: 'file-loader',
      options: {
        name: 'images/[name]-[hash].[ext]'
      }
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      chunks: ['main', 'common'],
      favicon: paths.source + '/assets/favicon.ico',
      template: paths.source + '/assets/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  }
};
