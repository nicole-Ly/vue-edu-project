import store from '../store'
import axios from 'axios'
const request = axios.create({

})
// 添加请求拦截器-添加token
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
export default request
