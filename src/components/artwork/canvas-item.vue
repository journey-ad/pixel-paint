<template>
  <div class="item">
    <div class="thumb"></div>
    <div class="info">
      <div class="title">{{title}}</div>
      <div class="meta">
        <div class="size">Size: {{`${size} x ${size}`}}</div>
        <div class="date">Created At: {{created}}</div>
      </div>
      <canvas class="color-chip" ref="colorChip"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title", "size", "created", "brushes"],
  methods: {
    generateColorChip(brushes) {
      if (!brushes || !brushes.length) return;

      let colorChip = this.$refs.colorChip;
      let ctx = colorChip.getContext("2d");

      let width = colorChip.clientWidth,
        height = colorChip.clientHeight,
        step = width / brushes.length,
        offset = 0;

      colorChip.width = width;
      colorChip.height = height;

      // console.log(width, step);

      brushes.forEach(color => {
        ctx.fillStyle = color;
        ctx.fillRect(offset, 0, step, width);
        offset += step;
        // console.log(offset);
      });
    }
  },
  mounted() {
    this.generateColorChip(this.brushes);
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  width: 360px;
  height: 80px;
  margin: 8px auto;
  background-color: $white-color;
  border: 1px solid $item-color;
  box-sizing: border-box;
  .thumb {
    width: 80px;
    height: 80px;
    background-color: #eee;
  }
  .info {
    position: relative;
    flex: 1;
    margin-left: 6px;
    .title {
      font-size: $font-size-small-x;
      color: $text-title-color;
      padding: 4px 0;
    }
    .meta {
      font-size: $font-size-small;
      color: $text-meta-color;
    }
    .color-chip {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 272px;
      height: 16px;
    }
  }
}
</style>
