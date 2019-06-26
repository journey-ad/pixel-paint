<template>
  <div
    class="item"
    :class="{active: isActive}"
    @click="initCanvasInfo"
    :data-id="artwork.id"
    ref="items"
    v-touch:swipe="swipeHandler"
  >
    <div class="thumb" :style="{backgroundImage: `url('${artwork.thumb}'`}"></div>
    <div class="info">
      <div class="title">{{artwork.title}}</div>
      <div class="meta">
        <div class="size">Size: {{`${artwork.size} x ${artwork.size}`}}</div>
        <div class="date">Created At: {{formatDate(artwork.created)}}</div>
      </div>
      <canvas class="color-chip" ref="colorChip"></canvas>
    </div>
    <div class="action">
      <div class="btn rename" @click.stop="renameArtwork">
        <icon class="icon" name="rename"></icon>
      </div>
      <div class="btn delete" @click.stop="deleteArtwork">
        <icon class="icon" name="clear"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      isActive: false
    };
  },
  props: ["artwork"],
  methods: {
    initCanvasInfo() {
      this.setArtworkInfo(this.artwork);
      this.$router.push({
        path: "/edit"
      });
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
    formatDate(ts) {
      return moment(ts).format("YYYY-MM-DD HH:mm:ss");
    },
    swipeHandler(direction) {
      if (direction === "left") {
        this.isActive = true;
      } else if (direction === "right") {
        this.isActive = false;
      }
    },
    deleteArtwork() {
      this.isActive = false;
      this.$emit("onDeleteArtwork", this.artwork.id);
    },
    renameArtwork(){
      this.isActive = false;
      this.$emit("onRenameArtwork", this.artwork.id);
    },
    ...mapMutations(["setArtworkInfo"])
  },
  mounted() {
    this.generateColorChip(this.$refs.colorChip, this.artwork.brush.colors);
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
  transition: transform 0.1s;
  .thumb {
    width: 80px;
    height: 80px;
    background-color: #eee;
    background-size: contain;
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
  &.active {
    transform: translateX(-120px);
    .action {
      display: flex;
    }
  }
  .action {
    display: none;
    position: absolute;
    left: 100%;
    height: 80px;
    padding: 2px;
    justify-content: center;
    align-items: center;
    .btn {
      display: flex;
      width: 60px;
      height: 100%;
      justify-content: center;
      align-items: center;

      .icon {
        width: 26px;
        height: 26px;
        color: $white-color;
      }
    }
    .rename {
      background: $background-color-warn;
    }
    .delete {
      background: $background-color-danger;
    }
  }
}
</style>
