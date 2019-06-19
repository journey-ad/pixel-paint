import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getter'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
