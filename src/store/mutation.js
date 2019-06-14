export default {
  setCanvas (state, canvas) {
    state.canvas = canvas
  },
  setArtworkInfo (state, info) {
    state.artwork = info ? Object.assign({}, state.artwork, info) : {}
  },
  setPushing (state, flag) {
    state.isPushing = flag
  },
  setScaleSize (state, size) {
    state.scaleSize = Math.min(Math.max(16, size), state.artwork.size)
  },
  setGridShow (state, flag) {
    state.isGridShow = flag
  }
}
