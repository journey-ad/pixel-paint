<template>
  <div class="new-canvas" @click.self="hide" @touchmove.prevent @mousewheel.prevent>
    <div class="modal">
      <div class="title-bar">
        <input
          type="text"
          class="title"
          ref="canvasTitle"
          value="New Canvas"
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
          <div class="brushes">
            <canvas class="color-chip" ref="colorChip"></canvas>
          </div>
        </div>
        <div class="size">
          <div class="type">Size</div>
          <div class="size-list">
            <select name="size" id>
              <option value="16" selected>Tiny(16 x 16 pixels)</option>
              <option value="16">Extra Small(24 x 24 pixels)</option>
              <option value="16">Small(32 x 32 pixels)</option>
              <option value="16">Medium(48 x 48 pixels)</option>
              <option value="16">Large(64 x 64 pixels)</option>
              <option value="16">Extra Large(96 x 96 pixels)</option>
              <option value="16">Huge(128 x 128 pixels)</option>
            </select>
          </div>
        </div>
      </div>
      <div class="create">create canvas</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brush: {
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
      brushes: [
        {
          title: "Canvas1",
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
        }
      ]
    };
  },
  methods: {
    hide() {
      this.$emit("setNewCanvasShow", false);
    },
    generateColorChip(colors) {
      if (!colors || !colors.length) return;

      let colorChip = this.$refs.colorChip;
      let ctx = colorChip.getContext("2d");

      let width = colorChip.clientWidth,
        height = colorChip.clientHeight,
        step = width / colors.length,
        offset = 0;

      if (!width || !height) return;

      colorChip.width = width;
      colorChip.height = height;

      // console.log(width, step);

      colors.forEach(color => {
        ctx.fillStyle = color;
        ctx.fillRect(offset, 0, step, width);
        offset += step;
        // console.log(offset);
      });
    }
  },
  mounted() {
    this.$refs.canvasTitle.focus();
    this.generateColorChip(this.brush.colors);
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
  background: #0009;
  .modal {
    width: 288px;
    height: 272px;
    background: #fff;
    .title-bar {
      height: 46px;
      line-height: 46px;
      border-bottom: 2px solid $theme-color;
      .title {
        width: 100%;
        height: 100%;
        padding-left: 8px;
        font-size: $font-size-medium;
        color: $theme-color;
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
    }
    .brush {
      .name {
        font-size: 12px;
        padding: 5px 0;
      }
      .brushes {
        width: 250px;
        height: 52px;
        border: 1px solid $item-color;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .color-chip {
          width: 212px;
          height: 44px;
          margin-left: 4px;
        }
      }
    }
    .size {
      .size-list {
        width: 250px;
        height: 32px;
        border: 1px solid $item-color;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        select {
          width: 100%;
          height: 100%;
          font-size: $font-size-small;
          margin-right: 4px;
          padding-left: 2px;
          background: transparent;
          border: 0;
          outline: none;
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
