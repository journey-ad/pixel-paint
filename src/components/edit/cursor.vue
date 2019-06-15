<template>
  <div class="cursor" :style="{transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`}">
    <icon name="cursor" :style="{color: color}"></icon>
  </div>
</template>

<script>
export default {
  props: ["offset"], // 使用transform的translate函数进行移动
  computed: {
    color() {
      return this.$store.state.artwork.currentBrushColor;
    }
  }
};
</script>

<style lang="scss" scoped>
.cursor {
  position: absolute;
  font-size: 0;
  top: -16px;
  left: -1px;
  transition: transform 0.05s;
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>
