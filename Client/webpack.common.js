const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('@babel/polyfill');

const paths = {
  source: path.resolve(__dirname, 'src'),
};

module.exports = {
  entry: {
    main: [
      '@babel/polyfill',
      paths.source + '/App.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /build/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                ['@babel/plugin-proposal-class-properties', { "loose": true }]
              ]
            }
          },
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: [/build/],
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        exclude: [/node_modules/, /build/],
        loader: 'file-loader',
        options: {
          name: 'images/[name]-[hash].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  }
};
