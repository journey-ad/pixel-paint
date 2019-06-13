<template>
  <div class="draw">
    <canvas ref="canvas"></canvas>
    <div class="meta" v-if="!artwork.canvasData || !artwork.canvasData.length">
      NO DATA :-(
      <br>
      <br>
      id: {{artwork.id}}
      <br>
      title: {{artwork.title}}
      <br>
      size: {{artwork.size}}
      <br>
      created: {{artwork.created}}
      <br>
      updated: {{artwork.updated}}
      <br>
      brush title: {{artwork.brush.title}}
    </div>
    <grid :size="scaleSize"></grid>
  </div>
</template>

<script>
import Grid from "./grid";
import { mapState, mapMutations, mapGetters } from "vuex";
import { clearInterval } from "timers";
export default {
  data() {
    return {};
  },
  computed: {
    canvasView() {
      return this.$refs.canvas;
    },
    ctxView() {
      return this.canvasView.getContext("2d");
    },
    widthView() {
      return this.canvasView.clientWidth;
    },
    canvasData() {
      return this.artwork.canvasData;
    },
    ctx() {
      return this.canvas.getContext("2d");
    },
    ...mapState(["canvas", "artwork"]),
    ...mapGetters(["scaleSize"])
  },
  methods: {
    drawCanvas() {
      if (!this.canvasData || !this.widthView) return;

      this.ctx.clearRect(0, 0, this.artwork.size, this.artwork.size);

      let offset_x = 0,
        offset_y = 0;

      for (let x = 0; x < this.canvasData.length; x++) {
        for (let y = 0; y < this.canvasData[x].length; y++) {
          let color = this.canvasData[x][y];

          // this.ctx.mozImageSmoothingEnabled = false;
          // this.ctx.webkitImageSmoothingEnabled = false;
          // this.ctx.msImageSmoothingEnabled = false;
          // this.ctx.imageSmoothingEnabled = false;

          this.ctx.fillStyle = color;
          this.ctx.fillRect(offset_x, offset_y, 1, 1);
          offset_x += 1;
          // console.log(offset_x, offset_y);
        }
        offset_x = 0;
        offset_y += 1;
      }
      this.drawCanvasView();

      this.raf = requestAnimationFrame(() => {
        this.drawCanvas();
      });
    },
    drawCanvasView() {
      if (!this.canvasData || !this.widthView) return;

      this.canvasView.width = this.canvasView.height = this.widthView;

      this.ctxView.clearRect(0, 0, this.widthView, this.widthView);

      this.ctxView.mozImageSmoothingEnabled = false;
      this.ctxView.webkitImageSmoothingEnabled = false;
      this.ctxView.msImageSmoothingEnabled = false;
      this.ctxView.imageSmoothingEnabled = false;

      this.ctxView.drawImage(
        this.canvas,
        0,
        0,
        this.scaleSize,
        this.scaleSize,
        0,
        0,
        this.widthView,
        this.widthView
      );
    },
    init() {
      this.setScaleSize(this.artwork.size);
      this.drawCanvas();
      this.timer = setInterval(() => {
        this.setArtworkInfo({
          thumb: this.canvas.toDataURL()
        });
      }, 1000);
    },
    ...mapMutations(["setArtworkInfo", "setScaleSize"])
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.raf);
    window.clearInterval(this.timer);
  },
  components: {
    Grid
  }
};
</script>

<style lang="scss" scoped>
.draw {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 368px;
  height: 368px;
  margin: 4px auto;
  border: 2px solid $black-color;
  canvas {
    width: 100%;
    height: 100%;
  }
  .meta {
    position: absolute;
    color: $black-color;
    font-size: 12px;
  }
}
</style>
