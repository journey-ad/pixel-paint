<template>
  <div class="new-canvas" @click.self="hide">
    <div class="modal">
      <div class="title-bar">
        <input
          type="text"
          class="title"
          ref="canvasTitle"
          v-model="title"
          placeholder="Input Canvas Name"
          autocomplete="off"
          autofocus
          @focus="$event.target.select()"
          required
        >
      </div>
      <div class="mod">
        <div class="brush">
          <div class="type">Brush</div>
          <div class="name">{{brush.title}}</div>
          <div class="brushes arrow" @click.stop="toggleBrushListShow(true)">
            <canvas class="color-chip" ref="colorChip"></canvas>
          </div>
          <div class="brush-list" v-show="isBrushListShow">
            <div
              class="item"
              v-for="(brush, index) in brushes"
              :key="index"
              @click="setBrush(brush)"
            >
              <div class="name">{{brush.title}}</div>
              <canvas class="color-chip" ref="colorChipBrushList"></canvas>
            </div>
          </div>
        </div>
        <div class="size">
          <div class="type">Size</div>
          <div class="size-list arrow">
            <select v-model="size">
              <option value="16" selected>Tiny(16 x 16 pixels)</option>
              <option value="24">Extra Small(24 x 24 pixels)</option>
              <option value="32">Small(32 x 32 pixels)</option>
              <option value="48">Medium(48 x 48 pixels)</option>
              <option value="64">Large(64 x 64 pixels)</option>
              <option value="96">Extra Large(96 x 96 pixels)</option>
              <option value="128">Huge(128 x 128 pixels)</option>
            </select>
          </div>
        </div>
      </div>
      <div class="create" @click="initCanvasInfo">create canvas</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import uuid from "@/js/uuid";
export default {
  data() {
    return {
      isBrushListShow: false,
      title: "New Canvas",
      size: 16,
      brush: {},
      brushes: [
        {
          title: "Default Brush",
          colors: [
            "#5c6891",
            "#7395c0",
            "#8bd5e7",
            "#a4f0de",
            "#c2f0b1",
            "#f0f3c0",
            "#fdeae0",
            "#f6c7c3",
            "#f3a6b2",
            "#f38798",
            "#e8718d",
            "#df5c84",
            "#b65d83",
            "#805772",
            "#604e61",
            "#ffffff"
          ]
        },
        {
          title: "Another Brush",
          colors: [
            "#b65d83",
            "#5c6891",
            "#ffffff",
            "#604e61",
            "#e8718d",
            "#f6c7c3",
            "#c2f0b1",
            "#a4f0de",
            "#7395c0",
            "#f0f3c0",
            "#8bd5e7",
            "#f38798",
            "#fdeae0",
            "#805772",
            "#df5c84",
            "#f3a6b2"
          ]
        },
        {
          title: "Another Brush",
          colors: [
            "#7395c0",
            "#a4f0de",
            "#fdeae0",
            "#f0f3c0",
            "#8bd5e7",
            "#df5c84",
            "#f38798",
            "#805772",
            "#f3a6b2",
            "#b65d83",
            "#604e61",
            "#5c6891",
            "#c2f0b1",
            "#e8718d",
            "#f6c7c3",
            "#ffffff"
          ]
        },
        {
          title: "Another Brush",
          colors: [
            "#8bd5e7",
            "#7395c0",
            "#f0f3c0",
            "#805772",
            "#e8718d",
            "#f3a6b2",
            "#604e61",
            "#f38798",
            "#a4f0de",
            "#fdeae0",
            "#5c6891",
            "#df5c84",
            "#f6c7c3",
            "#b65d83",
            "#c2f0b1",
            "#ffffff"
          ]
        },
        {
          title: "Another Brush",
          colors: [
            "#604e61",
            "#f3a6b2",
            "#7395c0",
            "#b65d83",
            "#f38798",
            "#805772",
            "#a4f0de",
            "#fdeae0",
            "#c2f0b1",
            "#e8718d",
            "#f0f3c0",
            "#5c6891",
            "#df5c84",
            "#8bd5e7",
            "#ffffff",
            "#f6c7c3"
          ]
        }
      ]
    };
  },
  methods: {
    hide() {
      this.$emit("toggleNewCanvasShow", false);
    },
    initCanvasInfo() {
      this.setArtworkInfo({
        id: uuid(),
        title: this.title,
        size: +this.size,
        created: Date.now(),
        updated: Date.now(),
        brush: this.brush,
        canvasData: [],
        thumb: ''
      });
      this.$router.push({
        path: "/edit"
      });
    },
    setBrush(brush) {
      this.brush = brush;
      this.toggleBrushListShow(false);
    },
    loadBrushList() {
      this.$nextTick(() => {
        this.$refs.colorChipBrushList.forEach((colorChip, index) => {
          this.generateColorChip(colorChip, this.brushes[index].colors);
        });
      });
    },
    toggleBrushListShow(flag) {
      this.isBrushListShow = flag || false;
      if (this.isBrushListShow) this.loadBrushList();
    },
    generateColorChip(colorChip, colors) {
      if (!colors || !colors.length) return;

      let ctx = colorChip.getContext("2d");

      let width = colorChip.clientWidth,
        height = colorChip.clientHeight,
        step = width / colors.length,
        offset = 0;

      if (!width || !height) return;

      colorChip.width = width;
      colorChip.height = height;

      // console.log(width, step);

      ctx.clearRect(0, 0, width, height);
      colors.forEach(color => {
        ctx.fillStyle = color;
        ctx.fillRect(offset, 0, step, width);
        offset += step;
        // console.log(offset);
      });
    },
    ...mapMutations(["setArtworkInfo"])
  },
  watch: {
    brush(newValue) {
      this.generateColorChip(this.$refs.colorChip, newValue.colors);
    }
  },
  mounted() {
    this.$refs.canvasTitle.focus();
    this.brush = this.brushes[0];
  }
};
</script>

<style lang="scss" scoped>
.new-canvas {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $background-color-overlay;
  .modal {
    position: relative;
    width: 290px;
    height: 270px;
    background: $white-color;
    .title-bar {
      height: 46px;
      line-height: 46px;
      border-bottom: 2px solid $theme-color;
      .title {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        font-size: $font-size-medium;
        letter-spacing: 0.05em;
        color: $theme-color;
        border: 0;
        outline: none;
      }
    }
    .mod {
      margin: 0 12px 12px;
      color: $text-title-color;
      .type {
        font-size: $font-size-small-x;
        padding: 8px 0;
      }
      .arrow {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: calc(50% - 3px);
          right: 12px;
          display: block;
          border: 6px solid transparent;
          border-top-color: $gray-color;
        }
      }
    }
    .brush {
      .name {
        font-size: 12px;
        padding: 5px 0;
      }
      .brushes {
        height: 52px;
        border: 1px solid $item-color;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .color-chip {
          width: 228px;
          height: 44px;
          margin-left: 4px;
        }
      }
      .brush-list {
        position: absolute;
        background: $background-color-list;
        top: 75px;
        width: 268px;
        height: 256px;
        border: 1px solid $border-color;
        box-shadow: $box-shadow;
        z-index: 2;
        overflow-y: scroll;
        .item {
          padding: 8px;
          .color-chip {
            width: 246px;
            height: 44px;
            margin-left: 4px;
          }
        }
      }
    }
    .size {
      .size-list {
        height: 32px;
        border: 1px solid $item-color;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        select {
          width: 100%;
          height: 100%;
          font-size: $font-size-small;
          padding-left: 4px;
          background: transparent;
          border: 0;
          outline: none;
          appearance: none;
          option {
            background: transparent;
            border: 0;
            outline: none;
          }
        }
      }
    }
    .create {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 280px;
      height: 44px;
      margin: 0px auto;
      color: $theme-color;
      border: 1px solid $theme-color;
      box-sizing: border-box;
      font-size: $font-size-medium;
      font-weight: 600;
      font-variant-caps: petite-caps;
    }
  }
}
</style>
