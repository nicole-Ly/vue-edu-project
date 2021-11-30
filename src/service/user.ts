import request from '@/utils/request'
import qs from 'qs'
interface User {
  phone: string
  password: string
}

export const login = (data:User) => {
  return request({
    method: 'post',
    url: '/front/user/login',
    data: qs.stringify(data) // axios 默认发送的是 application/json 格式的数据
  })
}
