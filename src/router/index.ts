import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'Login',
    path: '/login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index.vue')
  },
  {
    name: 'Role',
    path: '/role',
    component: () => import(/* webpackChunkName:'role' */ '@/views/role/index.vue')
  },
  {
    name: 'Menu',
    path: '/menu',
    component: () => import(/* webpackChunkName:'menu' */ '@/views/menu/index.vue')
  },
  {
    name: 'Resource',
    path: '/resource',
    component: () => import(/* webpackChunkName:'resource' */ '@/views/resource/index.vue')
  },
  {
    name: 'User',
    path: '/user',
    component: () => import(/* webpackChunkName:'user' */ '@/views/users/index.vue')
  },
  {
    name: 'Course',
    path: '/course',
    component: () => import(/* webpackChunkName:'course' */ '@/views/courses/index.vue')
  },
  {
    name: 'Advertise',
    path: '/advertise',
    component: () => import(/* webpackChunkName:'advertise' */ '@/views/advertise/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
