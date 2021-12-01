import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '../store'
Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch((err: any) => err)
// }

const routes: Array<RouteConfig> = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
      requiresAuth: true
    },
    children: [
      {
        name: 'role',
        path: '/role',
        meta: {
          title: '角色管理'
        },
        component: () => import(/* webpackChunkName:'role' */ '@/views/role/index.vue')
      },
      {
        name: 'menu',
        path: '/menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import(/* webpackChunkName:'menu' */ '@/views/menu/index.vue')
      },
      {
        name: 'resource',
        path: '/resource',
        meta: {
          title: '资源管理'
        },
        component: () => import(/* webpackChunkName:'resource' */ '@/views/resource/index.vue')
      },
      {
        name: 'user',
        path: '/user',
        meta: {
          title: '用户管理'
        },
        component: () => import(/* webpackChunkName:'user' */ '@/views/users/index.vue')
      },
      {
        name: 'course',
        path: '/course',
        meta: {
          title: '课程管理'
        },
        component: () => import(/* webpackChunkName:'course' */ '@/views/courses/index.vue')
      },
      {
        name: 'advertise',
        path: '/advertise',
        meta: {
          title: '广告管理'
        },
        component: () => import(/* webpackChunkName:'advertise' */ '@/views/advertise/index.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // 需要权限访问的路由配置meta
    if (!store.state.user) {
      next({
        name: 'login'
      })
      return
    }
    next()
    return
  }
  next()
  console.log('路由', to)
})
export default router
