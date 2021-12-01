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
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        meta: {
          title: '角色分配菜单'
        },
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        meta: {
          title: '角色分配资源'
        },
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
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
        component: () => import(/* webpackChunkName:'course' */ '@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
        props: true
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
        name: 'login',
        query: {
          redirect: to.path
        }
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
