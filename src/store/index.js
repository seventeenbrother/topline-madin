/**
 * 先引vue和vuex，
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '@/utils/auth'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 刚登陆进来时，store从本地存储中拿到初始化的用户数据，然后以后所有的组件用到用户数据时都从store中拿取或者修改
    user: getUser() || {}
  },
  mutations: {
    changeUser (state, user) {
      Object.assign(state.user, user)
      setUser(state.user)
    }
  }
})
export default store
