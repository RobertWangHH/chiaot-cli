/**
 * 单页面主入口
 * author: Wang <wangh@ciqtek.com>
 * company: ubiot.cn
 * date: 2019-10-21
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import App from './App'

import AntV from 'ant-design-vue'

Vue.use(VueRouter)
Vue.use(AntV)

import '@/style/index.less'

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
