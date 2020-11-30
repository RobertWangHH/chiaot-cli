const { resolve } = require('../util')

module.exports = {
  '@': resolve('src'),
  '@util': resolve('src/util'),
  '@components': resolve('src/components'),
  '@assets': resolve('src/assets')
}
