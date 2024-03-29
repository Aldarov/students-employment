const path = require('path');

const paths = {
  source: path.resolve(__dirname, 'src'),
};

module.exports = {
  entry: {
    main: [
      paths.source + '/index.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /build/],
        use: [
          {
            loader: 'babel-loader'
          },
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
