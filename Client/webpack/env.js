const webpack = require('webpack');

module.exports = function(env) {
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify(env)
        }
      })
    ]
  };
};
