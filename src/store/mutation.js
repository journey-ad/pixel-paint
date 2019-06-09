export default {
  setArtworkInfo (state, info) {
    state.artwork.id = info.id
    state.artwork.title = info.title
    state.artwork.size = info.size
    state.artwork.brush = info.brush
    state.artwork.currentBrushColor = info.currentBrushColor
    state.artwork.created = info.created
    state.artwork.updated = info.updated
    state.artwork.canvasData = info.canvasData
  },
  setCurrentBrushColor (state, color) {
    state.artwork.currentBrushColor = color
  },
  setPushing (state, flag) {
    state.isPushing = flag
  }
}
