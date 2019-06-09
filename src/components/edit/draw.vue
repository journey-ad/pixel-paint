<template>
  <div class="draw">
    <canvas ref="canvas"></canvas>
    <div class="meta" v-show="!artwork.canvasData.length">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["artwork"])
  }
};
</script>

<style lang="scss" scoped>
.draw {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 368px;
  height: 368px;
  margin: 4px auto;
  border: 1px solid $black-color;
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
