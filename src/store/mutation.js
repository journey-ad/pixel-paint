export default {
  setCanvas (state, canvas) {
    state.canvas = canvas
  },
  setArtworkInfo (state, info) {
    state.artwork = info ? Object.assign({}, state.artwork, info) : {}
  },
  setPushing (state, flag) {
    state.isPushing = flag
  }
}
