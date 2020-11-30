/**
 * 单页面主入口
 * author: Wang <wangh@ciqtek.com>
 * company: ubiot.cn
 * date: 2019-10-21
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
