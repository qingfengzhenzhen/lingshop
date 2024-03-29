import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import user from './modules/user'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    user,order
  }
})
