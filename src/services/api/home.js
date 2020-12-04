/**
 * home
 * author: Wang <wangh@ciqtek.com>
 * company: ubiot.cn
 * date: 2019-11-22
 */

import http from '@/services/http'

export default {
  // 获取列表
  getList(data) {
    return http.post('/user/release/list', data || {})
  }
}
