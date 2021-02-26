const { resolve } = require('./../util')
const { cacheLoader, threadLoader } = require('./loaders')

module.exports = [
  {
    test: /\.([jt])sx?$/,
    exclude: /node_modules/,
    include: [resolve('src')],
    use: [
      cacheLoader,
      threadLoader(),
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [['@babel/preset-env']],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            ['@babel/plugin-transform-runtime', { regenerator: true }],
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      }
    ]
  }
]
