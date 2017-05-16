const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css?$/,
          exclude: [/build/],
          include: paths,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.scss?$/,
          exclude: [/build/],
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css'),
      new OptimizeCssAssetsPlugin()
    ],
  };
};
