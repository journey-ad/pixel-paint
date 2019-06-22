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
      <div class="icon undo" :class="{disable: undoHistory.length === 0}">
        <icon class="icon-undo" @click.native="undo" name="undo" index="4"></icon>
      </div>
      <div class="icon redo" :class="{disable: redoHistory.length === 0}">
        <icon class="icon-redo" @click.native="redo" name="redo" index="5"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isGridShow", "artwork", "undoHistory", "redoHistory"])
  },
  props: ["thumb"],
  methods: {
    showSidebar() {
      this.$emit("toggleSidebarShow", true);
    },
    toggleGridShow() {
      console.log(!this.isGridShow);
      this.$store.commit("setGridShow", !this.isGridShow);
    },
    draw(target, color) {
      let canvasData = this.artwork.canvasData;

      canvasData[target.y][target.x] = color;
      this.setArtworkInfo({ canvasData });
    },
    undo() {
      let undoHistory = [...this.undoHistory],
        last = undoHistory.pop();
      this.UndoHistoryHandle({ action: "pop" });
      this.RedoHistoryHandle({ action: "push", data: last });

      this.draw(last.target, last.before);
    },
    redo() {
      let redoHistory = [...this.redoHistory],
        last = redoHistory.pop();
      this.RedoHistoryHandle({ action: "pop" });
      this.UndoHistoryHandle({ action: "push", data: last });

      this.draw(last.target, last.after);
    },
    ...mapMutations([
      "setArtworkInfo",
      "UndoHistoryHandle",
      "RedoHistoryHandle"
    ])
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
      &.disable {
        color: $theme-color-disabled;
        pointer-events: none;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
