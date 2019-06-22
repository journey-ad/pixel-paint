export default {
  setCanvas (state, canvas) {
    state.canvas = canvas
  },
  setArtworkInfo (state, info) {
    state.artwork = info ? Object.assign({}, state.artwork, info) : {}
  },
  updateThumb (state, thumb) {
    state.artwork.thumb = thumb
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
  UndoHistoryHandle (state, { action, data }) {
    if (typeof state.undoHistory === 'undefined') state.undoHistory = []
    switch (action) {
      case 'push':
        state.undoHistory.push(data)
        break
      case 'pop':
        state.undoHistory.pop()
        break
      case 'clear':
        state.undoHistory = []
    }
  },
  RedoHistoryHandle (state, { action, data }) {
    if (typeof state.redoHistory === 'undefined') state.redoHistory = []
    switch (action) {
      case 'push':
        state.redoHistory.push(data)
        break
      case 'pop':
        state.redoHistory.pop()
        break
      case 'clear':
        state.redoHistory = []
    }
  }
}
