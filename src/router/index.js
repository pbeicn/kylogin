import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/common/Home'
import login from '@/components/page/Login'

Vue.use(Router)
var constantRouterMap = [{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  hidden: true,
  children: [{
    path: '/dashboard',
    component: () => import('@/components/page/Dashboard'),
    meta: {
      title: '首页'
    }
  }]
},
{
  path: '/login', // 登录页面
  component: login,
  hidden: true
}
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/authredirect'),
  //   hidden: true
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
]
export default new Router({
  routes: constantRouterMap
})
