const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'react-hot-loader' },
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2']
            }
          }
        ]
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },

  // devtool: 'cheap-eval-source-map',
  devtool: 'eval',

  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  }
};
