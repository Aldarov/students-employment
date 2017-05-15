const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const devserver = require('./webpack/devserver');
const jsx = require('./webpack/jsx');
const css = require('./webpack/css');
const cssExtract = require('./webpack/cssExtract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');

const PATHS = {
  source: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
};

const common = function(env) {
  return merge([
    {
      entry: {
        'main': PATHS.source + '/index.js'
      },
      output: {
        path: PATHS.build,
        filename: 'js/[name].js',
        publicPath: '/'
      },

      plugins: [
        new HTMLWebpackPlugin({
          chunks: ['main', 'common'],
          favicon: PATHS.source + '/assets/favicon.ico',
          template: PATHS.source + '/assets/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common'
        })
      ],

      resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
      }
    },
    jsx(env),
    images()
  ])
};

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common(env),
      cssExtract(),
      uglifyJS()
    ]);
  }
  if (env === 'development') {
    return merge([
      common(env),
      css(),
      devserver(),
      {devtool: 'cheap-module-eval-source-map'}
    ]);
  }
};
