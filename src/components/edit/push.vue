<template>
  <div class="push" @touchstart="push(true)" @touchend="push(false)" @contextmenu.prevent>
    <div class="top" :class="{active: isPushing}">
      <icon class="push-icon" name="push"></icon>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["artwork", "isPushing", "viewportOffset", "currentOffset"])
  },
  methods: {
    draw(target, color) {
      let canvasData = this.artwork.canvasData;

      this.UndoHistoryHandle({
        action: "push",
        data: {
          target: target,
          before: canvasData[target.y][target.x],
          after: color
        }
      });
      this.RedoHistoryHandle({ action: "clear" });

      canvasData[target.y][target.x] = color;
      this.setArtworkInfo({ canvasData });
    },
    push(flag) {
      console.log(`${flag ? "开始" : "结束"}绘制`);
      if (flag) {
        let target = {
          x: this.viewportOffset.x + this.currentOffset.x,
          y: this.viewportOffset.y + this.currentOffset.y
        };

        this.draw(target, this.artwork.currentBrushColor);
      }
      this.setPushing(flag);
    },
    ...mapMutations([
      "setArtworkInfo",
      "setPushing",
      "UndoHistoryHandle",
      "RedoHistoryHandle"
    ])
  }
};
</script>

<style lang="scss" scoped>
.push {
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 370px;
  height: 120px;
  background: $push-color;
  border: 2px solid $border-color-push;
  border-radius: 8px;
  .top {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 105px;
    background: $white-color;
    border: 2px solid $border-color-push;
    border-radius: 8px;
    &.active {
      bottom: 0;
    }
    .push-icon {
      width: 120px;
      height: 40px;
    }
  }
}
@media screen and (min-width: 768px), screen and (max-height: 520px) {
  .push {
    height: 66px;
    .top {
      height: 56px;
      .push-icon {
        width: 90px;
        height: 30px;
      }
    }
  }
}
</style>
