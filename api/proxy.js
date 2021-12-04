// 该服务为 vercel serve跨域处理
import { createProxyMiddleware } from 'http-proxy-middleware'

export default (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  // xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith('/boss')) {
    target = 'http://eduboss.lagou.com'
  }
  if (req.url.startsWith('/front')) {
    target = 'http://edufront.lagou.com'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
    }
  })(req, res)
}
