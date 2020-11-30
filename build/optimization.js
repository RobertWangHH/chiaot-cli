const TerserPlugin = require('terser-webpack-plugin')

module.exports = process.env.NODE_ENV === 'development'
  ? {}
  : {
    // 缓存webpack固定生成的代码块，该代码块通常不变，用于维系各模块之间的关系
    runtimeChunk: {
      name: 'manifest'
    },
    // 用于指定需要进行分块的代码，和分块后文件名
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'split-vendor',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 采用多线程来加速压缩
        parallel: true
      })
    ]
  }
