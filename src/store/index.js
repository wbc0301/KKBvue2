import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {
    permission: permission, 
    user: user
  },

  getters: {  // 全局定义getters便于访问
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
  }
})

export default store