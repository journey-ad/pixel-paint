export default {
  scaleSize (state) {
    return Math.min(Math.max(16, state.scaleSize), state.artwork.size)
  }
}
