module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css?$/,
          include: paths,
          exclude: [/build/],
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss?$/,
          exclude: [/build/],
          include: paths,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
      ]
    }
  };
};
