const path = require('path');

const paths = {
  source: path.resolve(__dirname, 'src'),
};

module.exports = {
  entry: {
    'main': [
      'babel-polyfill',
      paths.source + '/App.js'
    ]
  },
  module: {
    rules: [{
      test: /\.(gif|png|jpg|jpeg|svg)$/,
      exclude: [/node_modules/, /build/],
      loader: 'file-loader',
      options: {
        name: 'images/[name]-[hash].[ext]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  }
};
