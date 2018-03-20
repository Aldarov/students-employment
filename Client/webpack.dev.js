const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
  source: path.resolve(__dirname, 'src'),
};

module.exports = merge(
  common,
  {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/, /build/],
          use: [
            { loader: 'react-hot-loader/webpack' },
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  'transform-decorators-legacy'
                ],
                presets: ['es2015', 'react', 'stage-2'],
              }
            },
            { loader: 'eslint-loader' }
          ]
        },
        {
          test: /\.(scss|css)$/,
          exclude: [/build/],
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
      ]
    },
    devServer: {
      stats: 'errors-only',
      historyApiFallback: true,
      inline: true,
      hot: true,
      proxy: {
        '/api': 'http://localhost:5000'
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new htmlWebpackPlugin({
        chunks: ['main'],
        favicon: paths.source + '/assets/favicon.ico',
        template: paths.source + '/assets/index.html'
      }),
    ],
    devtool: 'eval',
  }
);
