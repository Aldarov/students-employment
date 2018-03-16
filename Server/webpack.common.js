const path = require('path');

const paths = {
  source: path.resolve(__dirname, 'client/src'),
  build: path.resolve(__dirname, 'wwwroot')
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  entry: {
    'main': [
      'babel-polyfill',
      paths.source + '/App.js'
    ]
  },
  output: {
    path: paths.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /wwwroot/],
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
          // { loader: 'eslint-loader' }
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
};
