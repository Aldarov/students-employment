const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(
  common,
  {
    // devServer: {
    //   stats: 'errors-only',
    //   historyApiFallback: true,
    //   inline: true,
    //   hot: true,
    //   // proxy: {
    //   //   '/api': 'http://localhost:5000'
    //   // }
    // },
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('development')
        }
      }),
    ],
    devtool: 'inline-source-map',
  }
);
