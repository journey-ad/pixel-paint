<template>
  <div class="draw" :class="{'no-data': !canvasData.length}">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["canvasData"])
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
  &.no-data::before {
    content: "NO DATA :-(";
    position: absolute;
    color: $gray-color;
    font-size: 22px;
    font-weight: 800;
  }
}
</style>
