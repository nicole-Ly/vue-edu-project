import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '../store'
Vue.use(VueRouter)

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
        component: () => import(/* webpackChunkName:'menu' */ '@/views/menu/index.vue')
      },
      {
        name: 'resource',
        path: '/resource',
        component: () => import(/* webpackChunkName:'resource' */ '@/views/resource/index.vue')
      },
      {
        name: 'user',
        path: '/user',
        component: () => import(/* webpackChunkName:'user' */ '@/views/users/index.vue')
      },
      {
        name: 'course',
        path: '/course',
        component: () => import(/* webpackChunkName:'course' */ '@/views/courses/index.vue')
      },
      {
        name: 'advertise',
        path: '/advertise',
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
