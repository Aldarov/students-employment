module.exports = function(env) {
  let use = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }
  ];

  if (env === 'development') {
    hotLoader = [{loader: 'react-hot-loader'}];
    use = hotLoader.concat(hotLoader, use);
  }

  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: use
      }]
    }
  }
}
