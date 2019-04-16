const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const paths = {
  build: path.resolve(__dirname, 'build')
};

module.exports = merge(
  common,
  {
    mode: 'production',
    output: {
      path: paths.build,
      filename: './js/[name].js',
      publicPath: '/'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'all',
            name: 'vendor',
            enforce: true
          },
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: './css/[name].css' }),
    ],
  }
);
