const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const constants = require('./constants')
const aliasRules = require('./rules/aliasRules')
const { resolve, assetsPath } = require('./util')

const styleRules = require('./rules/styleRules')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const vueRules = require('./rules/vueRules')
const listen = require('./listen')
const plugins = require('./plugin')
const optimization = require('./optimization')

const webpackConfig = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === 'development',
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: '[name].[chunkhash:5].js'
  },
  module: {
    rules: [...styleRules, ...fileRules, ...vueRules]
  },
  resolve: {
    extensions: constants.FILE_EXTENSIONS,
    modules: [resolve('src'), resolve('node_modules')],
    alias: aliasRules
  },
  devtool: config.sourceMap,
  devServer: config.proxyTable,
  plugins,
  optimization
}

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig, listen)
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
