const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./../config')
const { resolve } = require('./../util')
const theme = require('./../../theme')
const { cacheLoader } = require('./loaders')

const cssLoader = modules => ({
  loader: 'css-loader',
  options: {
    modules: modules
      ? {
          mode: 'local',
          localIdentName: '[hash:base64:16]'
        }
      : false
  }
})

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [resolve('src/styles')]
    }
  }
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: aliyunTheme.default
      modifyVars: theme
      // modifyVars: getThemeVariables({
      //   dark: false, // 暗黑模式
      //   compact: true // 紧凑模式
      // })
    }
  }
}

const baseLoaders = modules => [
  config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
  cacheLoader,
  cssLoader(modules),
  'postcss-loader'
]

module.exports = [
  {
    test: /\.css$/,
    include: [resolve('src'), resolve('node_modules')],
    use: baseLoaders(false)
  },
  {
    test: /\.scss$/,
    include: [resolve('src')],
    use: [...baseLoaders(true), sassLoader]
  },
  {
    // for ant design
    test: /\.less$/,
    // less do not use threadLoader
    // https://github.com/webpack-contrib/thread-loader/issues/10
    use: [...baseLoaders(false), lessLoader]
  }
]
