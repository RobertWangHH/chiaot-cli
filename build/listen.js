const chalk = require('chalk')
const config = require('./config')

let startTime = Date.now()
let loopCount = 0

module.exports = function() {
  var timer = setTimeout(function() {
    console.log('   _____ _    _ _____          ____ _______ \n' +
      '  / ____| |  | |_   _|   /\\   / __ \\__   __|\n' +
      ' | |    | |__| | | |    /  \\ | |  | | | |   \n' +
      ' | |    |  __  | | |   / /\\ \\| |  | | | |   \n' +
      ' | |____| |  | |_| |_ / ____ \\ |__| | | |   \n' +
      '  \\_____|_|  |_|_____/_/    \\_\\____/  |_|   \n' +
      '                                            \n' +
      '                                            ')
    console.log(
      chalk.white.bgGreen.bold('chiaot'),
      chalk.blueBright(`webpack 监听启动, 已启动的时间: ${(Date.now() - startTime) / 1000} s`),
      `修改次数: ${++loopCount}`
    )
    console.log(chalk.gray('访问路径：', chalk.underline.blueBright(`http://${config.proxyTable.host}:${config.proxyTable.port}`) + '!'))

    clearTimeout(timer)
  }, 250)
}
