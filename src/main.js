import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'

// 引入axios为了配置axios的基础路径，并且将axios挂在到Vue的prototype中
// 配置基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 将axios挂在到Vue的prototype中
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
