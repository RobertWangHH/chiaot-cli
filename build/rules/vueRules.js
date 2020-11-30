const { resolve } = require('./../util')
const { cacheLoader, threadLoader } = require('./loaders')

module.exports = [
  {
    test: /.vue$/,
    exclude: /node_modules/,
    include: [resolve('src')],
    use: [
      cacheLoader,
      threadLoader(),
      {
        loader: 'vue-loader'
      }
    ]
  }
]
