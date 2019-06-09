export default {
  setCanvasInfo (state, info) {
    state.title = info.title
    state.size = info.size
    state.brush = info.brush
  },
  setCurrentBrushColor (state, color) {
    state.setCurrentBrushColor = color
  },
  setPushing (state, flag) {
    state.isPushing = flag
  }
}
