const webpack = require('webpack');

module.exports = function() {
  return {
    devServer: {
      stats: 'errors-only',
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': 'http://localhost:5000'
      }
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ],
  };
}
