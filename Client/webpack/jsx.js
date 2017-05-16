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
    const hotLoader = [{loader: 'react-hot-loader'}];
    const eslintLoader = [{loader: 'eslint-loader'}];
    use = hotLoader.concat(hotLoader, use, eslintLoader);
  }

  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /build/],
        use: use
      }]
    }
  };
};
