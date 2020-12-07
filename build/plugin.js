const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const config = require('./config')

const { assetsPath } = require('./util')

module.exports = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'chiaot cli',
    template: path.resolve(__dirname, './tpl/index.html'),
    filename: 'index.html',
    inject: true
  }),
  new MiniCssExtractPlugin({
    filename: assetsPath('css/[name].[contenthash].css'),
    chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new VueLoaderPlugin(),
  new CompressionWebpackPlugin({
    filename: "[path][base].gz",
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(' + config.productionGzipExtensions.join('|') + ')$'
    ),
    threshold: 10240,
    minRatio: 0.8
  })
]
