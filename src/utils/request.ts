import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import qs from 'qs'

const request = axios.create({

})
// 请求拦截器-添加token
request.interceptors.request.use(function (config) {
  config.headers = config.headers || {}
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refresh_token 只能使用1次
      refreshtoken: store.state.user.refresh_token
    })
  })
}
let isRfreshing = false // 控制刷新 token 的状态
let requests: any[] = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  console.log(444444444444, error.response)
  if (error.response) {
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求参数错误')
        break
      case 401:
        // token 无效（没有提供 token、token 是无效的、token 过期了）
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }

        // 刷新 token
        if (!isRfreshing) {
          isRfreshing = true // 开启刷新状态
          // 尝试刷新获取新的 token
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token 失败')
            }

            // 刷新 token 成功了
            store.commit('setUser', res.data.content)
            // 把 requests 队列中的请求重新发出去
            requests.forEach(cb => cb())
            // 重置 requests 数组
            requests = []
            return request(error.config)
          }).catch(err => {
            console.log(err)
            Message.warning('登录已过期，请重新登录')
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRfreshing = false // 重置刷新状态
          })
        }
        // 刷新状态下，把请求挂起放到 requests 数组中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
        break
      case 403:
        Message.error('没有权限，请联系管理员')
        break
      case 404:
        Message.error('请求资源不存在')
        break
      default:
        if (status >= 500) {
          Message.error('服务端错误，请联系管理员')
        }
        break
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }

  return Promise.reject(error)
})
export default request
