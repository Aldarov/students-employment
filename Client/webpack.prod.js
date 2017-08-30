const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(
  common,
  {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/, /build/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react', 'stage-2']
              }
            }
          ]
        },
        {
          test: /\.(scss|css)$/,
          exclude: [/build/],
          use: extractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
      ]
    },
    plugins: [
      new extractTextPlugin('./css/[name]-[hash].css'),
      new optimizeCssAssetsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
  }
);
