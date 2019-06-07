<template>
  <div class="new-canvas">
    <icon class="pencil-add" name="pencil-add"></icon>
    <span>New Canvas</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.new-canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 360px;
  height: 90px;
  margin: 8px auto;
  color: $theme-color;
  border: 1px solid $theme-color;
  box-sizing: border-box;
  .pencil-add {
    width: 24px;
    height: 24px;
    margin: 8px;
  }
  span {
    font-size: $font-size-small-x;
  }
}
</style>
