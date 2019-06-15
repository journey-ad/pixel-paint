<template>
  <div class="cursor">
    <icon name="cursor" :style="{color: color}"></icon>
  </div>
</template>

<script>
export default {
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
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>
