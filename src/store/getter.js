export default {
  viewportSize (state) {
    return Math.min(Math.max(16, state.viewportSize), state.artwork.size)
  }
}
