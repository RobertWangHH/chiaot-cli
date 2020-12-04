/**
 * HTTP封装
 * author: Wang <wangh@ciqtek.com>
 * company: ubiot.cn
 * date: 2019-11-22
 */

import axios from 'axios'
import _ from 'lodash'
import * as qs from 'qs'
import {message} from 'ant-design-vue'

const HTTPERROR = {
  LOGICERROR: 0,
  TIMEOUTERROR: 1,
  NETWORKERROR: 2
}

const TOKENERROR = [401, 402, 403]
const NETWORKERROR = [500, 501, 502, 503, 504]

const DEFAULTCONFIG = {
  baseURL: '/api',
  timeout: 30000, // 请求超时
  withCredentials: true // 跨域请求时发送 cookies
}

const http = {}
const methods = ['get', 'post', 'put', 'delete']

let authTimer = null

const isSuccess = res => res.code === 200 || res.code === 1
const resFormat = res => res.response || res.data || {}

methods.forEach(v => {
  http[v] = (url, data, isNotJson, baseUrl) => {
    const headers = {}
    if (!isNotJson) {
      _.merge(headers, {"Content-Type": 'application/json', "Accept": 'application/json'})
    } else {
      _.merge(headers, {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Accept": 'application/x-www-form-urlencoded'
      })
    }
    const axiosConfig = {
      method: v,
      url,
      baseURL: baseUrl || DEFAULTCONFIG.baseURL,
      headers
    }
    const instance = axios.create(DEFAULTCONFIG)
    // Add a request interceptor
    instance.interceptors.request.use(
      cfg => {
        const ts = Date.now() / 1000
        const queryData = {ts}
        cfg.params = {...cfg.params, ...queryData}
        return cfg
      },
      error => Promise.reject(error)
    )
    // Add a response interceptor
    instance.interceptors.response.use(
      response => {
        let rdata = null
        if (typeof response.data === 'object' && !isNaN(response.data.length)) {
          rdata = response.data[0]
        } else {
          rdata = response.data
        }
        if (!isSuccess(rdata)) {
          const _err = {
            msg: rdata.message,
            errCode: rdata.code,
            type: HTTPERROR[HTTPERROR.LOGICERROR],
            config: response.config
          }
          return Promise.reject(_err)
        }
        // if (rdata.accessToken) setCookie(COOKIE_KEYS.TOKEN, rdata.accessToken)
        return resFormat(rdata)
      },
      error => {
        console.log(error)
        if (TOKENERROR.includes(error.response.status)) {
          message.destroy()
          message.error('用户认证失败! 请登录重试...')
          window.clearTimeout(authTimer)
          authTimer = window.setTimeout(() => {
            window.location.replace(`/public/prod/#/login`)
          }, 300)
          return
        }
        if (NETWORKERROR.includes(error.response.status)) {
          return Promise.reject({
            msg: '系统异常',
            type: /^timeout of/.test(error.message)
              ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
              : HTTPERROR[HTTPERROR.NETWORKERROR],
            config: error.config
          })
        }
        const _err = {
          msg: error.response.data.message || error.message || '网络故障',
          type: /^timeout of/.test(error.message)
            ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
            : HTTPERROR[HTTPERROR.NETWORKERROR],
          config: error.config
        }
        return Promise.reject(_err)
      }
    )
    if (v === 'get') {
      axiosConfig.params = data
    } else if (data instanceof FormData) {
      axiosConfig.data = data
    } else {
      if (isNotJson) {
        axiosConfig.data = qs.stringify(data)
      } else {
        axiosConfig.data = data
      }
    }
    axiosConfig.startTime = new Date()
    return new Promise((resolve, reject) => {
      instance
        .request(axiosConfig)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          message.destroy()
          message.error(err.response || err.msg || err.stack || '未知错误')
          reject(err)
        })
    })
  }
})

export default http
