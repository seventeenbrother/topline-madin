import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
import { getUser, removeUser } from '@/utils/auth'

// 引入axios为了配置axios的基础路径，并且将axios挂在到Vue的prototype中
// 配置基础路径
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
// 将axios挂在到Vue的prototype中
Vue.prototype.$http = axios

// 请求拦截器：request interceptor
axios.interceptors.request.use(config => {
  // 在发出请求之前对请求做一些处理
  const user = getUser()
  // 在此做判断。防止user为空
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求的错误做一些处理
  return Promise.reject(error)
})
// // 响应拦截器
axios.interceptors.response.use(response => {
  // 在发出请求之前对请求做一些处理
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, function (error) {
  // 对请求的错误做一些处理
  // 如果状态吗为401，表示发送请求携带的token没有授权，所以要跳转到登陆页，并删除该用户
  if (error.response.status === 401) {
    removeUser()
    router.push({
      name: '/login'
    })
  }
  return Promise.reject(error)
})

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
