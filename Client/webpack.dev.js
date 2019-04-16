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
    mode: 'development',
    output: {
      publicPath: '/'
    },
    devServer: {
      stats: 'errors-only',
      historyApiFallback: true,
      inline: true,
      hot: true,
      proxy: {
        '/api': 'http://localhost:5000',
        '/reports': 'http://localhost:5000'
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
  }
);
