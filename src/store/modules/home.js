/**
 * 状态管理modules => home
 * author: Wang <wangh@ciqtek.com>
 * company: ubiot.cn
 * date: 2019-10-21
 */

const state = {
  page: 1,
  pageSize: 10,
  total: 0,
  selectedRowKeys: []
}

const mutations = {
  SET_TOTAL: (state, total) => {
    state.total = total
  },
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_SIZE: (state, pageSize) => {
    state.pageSize = pageSize
  },
  SET_SELECTED: (state, selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys
  }
}

const actions = {
  removeOne({ commit }, id) {
    return new Promise((resolve, reject) => {
      console.log('删除某信息，id为：' + id)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
