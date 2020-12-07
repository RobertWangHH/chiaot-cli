const path = require('path')

module.exports = {
  publicPath: '/',
  assetsSubDirectory: 'static',
  proxyTable: {
    contentBase: path.resolve(__dirname, './../src'),
    host: '192.168.10.23',
    port: 5173,
    compress: true,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        // api表示当前项目请求的key
        target: 'https://www.zuihongniang.com/drunken_hn', // 代理服务器路径
        pathRewrite: { '^/api': '' }, // 重写路径
        changeOrigin: true
      }
    }
  },
  sourceMap:
    process.env.NODE_ENV === 'development'
      ? 'eval'
      : 'nosources-source-map',
  extractCss: process.env.NODE_ENV !== 'development',
  bundleAnalyzerReport: process.env.NODE_ENV !== 'development',
  productionGzipExtensions: []
}
