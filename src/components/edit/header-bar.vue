<template>
  <div class="header-bar">
    <div class="preview" :style="{backgroundImage: `url('${thumb}'`}" @click="showSidebar"></div>
    <div class="tools">
      <div class="icon palette">
        <icon class="icon-palette" name="palette" index="0"></icon>
      </div>
      <div class="icon move">
        <icon class="icon-move" name="move" index="1"></icon>
      </div>
      <div class="icon grid" :class="{active: isGridShow}">
        <icon class="icon-grid" @click.native="toggleGridShow" name="grid" index="2"></icon>
      </div>
      <div class="icon fill">
        <icon class="icon-fill" name="fill" index="3"></icon>
      </div>
      <div class="icon undo">
        <icon class="icon-undo" name="undo" index="4"></icon>
      </div>
      <div class="icon redo">
        <icon class="icon-redo" name="redo" index="5"></icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isGridShow() {
      return this.$store.state.isGridShow;
    }
  },
  props: ["thumb"],
  methods: {
    showSidebar() {
      this.$emit("toggleSidebarShow", true);
    },
    toggleGridShow() {
      console.log(!this.isGridShow);
      this.$store.commit("setGridShow", !this.isGridShow);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid $border-color-edit;
  .preview {
    width: 32px;
    height: 32px;
    background: $item-color;
    background-size: contain;
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
      &.active {
        color: $theme-color-active;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
