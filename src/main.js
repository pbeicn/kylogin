// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import '@/utils/global'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/icon.css'
import './promission'
// import '@/mock'
import 'font-awesome/css/font-awesome.css'

Vue.use(ElementUI)
// Vue.use(ElementUI, {
//   size: 'small'
// })
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://localhost:9099/admin/'
// axios.defaults.baseURL = 'http://10.19.95.5:9099/admin/'
axios.defaults.baseURL = 'http://10.19.95.5:8888/admin/'
// axios.defaults.baseURL = 'http://10.19.95.164:8888/admin/'
// axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
// Vue.http.options.emulateJSON = true
Vue.prototype.$ajax = axios

// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = sessionStorage.getItem('username')
//   console.log(to.path)
//   if (!role && to.path !== '/login') {
//     sessionStorage.removeItem('authtoken')
//     next('/login')
//   } else if (to.path === '/login') {
//     sessionStorage.removeItem('authtoken')
//     next()
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     role === 'admin' ? next() : next('/403')
//   } else {
//     next()
//   }
// })
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 判断是否存在token，如果存在将每个页面header都添加token
  let authtoken = sessionStorage.getItem('authtoken')
  if (authtoken !== null) {
    config.headers['authtoken'] = authtoken
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           this.$store.commit('del_token')
//           router.replace({
//             path: '/login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             } // 登录成功后跳入浏览的当前页面
//           })
//       }
//     }
//     return Promise.reject(error.response.data)
//   })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
