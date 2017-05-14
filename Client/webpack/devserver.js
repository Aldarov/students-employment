module.exports = function(env) {
  return {
    devServer: {
      stats: 'errors-only',
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:5000'
      }
    }
  }
}
