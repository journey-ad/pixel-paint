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
  setViewportSize (state, size) {
    state.viewportSize = Math.min(Math.max(16, size), state.artwork.size)
  },
  setGridShow (state, flag) {
    state.isGridShow = flag
  },
  setViewportOffset (state, offset) {
    state.viewportOffset = Object.assign({}, state.viewportOffset, offset)
  },
  setCurrentOffset (state, offset) {
    state.currentOffset = Object.assign({}, state.currentOffset, offset)
  },
  pushHistory (state, action) {
    if (typeof state.history === 'undefined') state.history = []
    state.history.push(action)
  },
  pushTempHistory (state, action) {
    if (typeof state.tempHistory === 'undefined') state.tempHistory = []
    state.tempHistory.push(action)
  }
}
