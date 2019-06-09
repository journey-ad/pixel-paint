<template>
  <div class="header-bar">
    <div class="preview"></div>
    <div class="tools">
      <div class="icon palette">
        <icon class="icon-palette" name="palette"></icon>
      </div>
      <div class="icon move">
        <icon class="icon-move" name="move"></icon>
      </div>
      <div class="icon grid">
        <icon class="icon-grid" name="grid"></icon>
      </div>
      <div class="icon fill">
        <icon class="icon-fill" name="fill"></icon>
      </div>
      <div class="icon undo">
        <icon class="icon-undo" name="undo"></icon>
      </div>
      <div class="icon redo">
        <icon class="icon-redo" name="redo"></icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid $border-color-edit;
  .preview {
    width: 42px;
    height: 42px;
    background: $item-color;
    margin: 0 4px;
    border: 1px solid $black-color;
  }
  .tools {
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 22px;
      height: 22px;
      color: $theme-color;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
