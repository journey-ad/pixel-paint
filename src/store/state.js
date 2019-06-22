export default {
  artwork: {
    id: '',
    title: '',
    size: -1,
    created: -1,
    updated: -1,
    brush: {
      title: '',
      colors: []
    },
    currentBrushColor: '',
    canvasData: [],
    thumb: ''
  },
  canvas: null,
  isPushing: false,
  isGridShow: true,
  viewportSize: -1,
  viewportOffset: { x: 0, y: 0 },
  currentOffset: { x: 0, y: 0 },
  undoHistory: [],
  redoHistory: []
}
