const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  source: path.resolve(__dirname, 'src'),
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
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          exclude: [/build/],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        }),
      ],
      // splitChunks: {
      //   chunks: 'all',
      // },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: './css/[name].css' }),
      new htmlWebpackPlugin({
        favicon: paths.source + '/assets/favicon.ico',
        template: paths.source + '/assets/index.html'
      }),
    ]
  }
);
