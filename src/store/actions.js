export default {
  setCurrentOffset ({ commit }, offset) {
    commit('setCurrentOffset', offset)
  },
  psuhHistory ({ commit }, action) {
    commit('pushHistory', action)
  },
  psuhTempHistory ({ commit }, action) {
    commit('pushTempHistory', action)
  }
}
