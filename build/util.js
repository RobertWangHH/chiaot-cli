const path = require('path')
const config = require('./config')

// 路径指向根目录
exports.resolve = function (dir) {
  return path.join(__dirname, './../', dir)
}

// 路径指向dist文件夹
exports.assetsPath = function (dir) {
  return path.posix.join(config.assetsSubDirectory, dir)
}
