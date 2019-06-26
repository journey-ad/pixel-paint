<template>
  <div class="edit" v-if="artwork.id">
    <header-bar :thumb="artwork.thumb" @toggleSidebarShow="toggleSidebarShow"></header-bar>
    <draw v-if="canvas"></draw>
    <brush-list></brush-list>
    <push></push>
    <sidebar
      :isSidebarShow="isSidebarShow"
      @toggleSidebarShow="toggleSidebarShow"
      @saveArtwork="save"
      @exportArtwork="exportArtwork"
      @clearArtwork="clearArtwork"
    ></sidebar>
    <comfirm
      v-show="confirm.show"
      title="Confirm"
      content="Do you really want to back?"
      @return="setCloseable"
    ></comfirm>
  </div>
</template>

<script>
import HeaderBar from "@/components/edit/header-bar";
import Draw from "@/components/edit/draw";
import BrushList from "@/components/edit/brush-list";
import Push from "@/components/edit/push";
import Sidebar from "@/components/edit/sidebar";
import Comfirm from "@/components/common/confirm";
import { mapState, mapMutations } from "vuex";
import { saveArtwork } from "@/js/cache";
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      isSidebarShow: false,
      confirm: {
        show: false,
        closeable: null
      }
    };
  },
  computed: {
    ...mapState(["artwork"])
  },
  methods: {
    initCanvas() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = this.artwork.size;
      this.canvas.height = this.artwork.size;

      this.setCanvas(this.canvas);
    },
    save() {
      console.log("保存绘板数据");
      let artwork = Object.assign({}, this.artwork, {
        updated: Date.now()
      });
      this.setArtworkInfo(artwork);
      saveArtwork(artwork);
    },
    toggleSidebarShow(flag) {
      this.isSidebarShow = flag;
    },
    setCloseable(flag) {
      this.confirm.show = false;
      if (flag) {
        this.confirm.closeable = true;
        this.$router.back();
      }
    },
    exportArtwork() {
      let output = document.createElement("canvas"),
        ctx = output.getContext("2d");

      output.width = output.height = 1000;

      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(this.canvas, 0, 0, 1000, 1000);

      let img = output.toDataURL("image/png"),
        name = this.artwork.title;

      this.downloadImage(img, name);
    },
    clearArtwork() {
      this.artwork.canvasData = Array(this.artwork.size)
        .fill()
        .map(() => Array(this.artwork.size).fill("#ffffff"));
    },
    downloadImage(url, name) {
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.dispatchEvent(new MouseEvent("click", {}));
    },
    ...mapMutations(["setArtworkInfo", "setCanvas"])
  },
  mounted() {
    this.initCanvas();
    if (!this.artwork.id) {
      this.$router.replace({
        path: "/artwork"
      });
    } else {
      this.thumb = this.artwork.thumb;
      this.timer = setInterval(() => {
        this.save();
      }, 1000 * 30);
    }
  },
  beforeRouteLeave(to, from, next) {
    const flag = !this.artwork.id || this.confirm.closeable;

    if (flag) {
      clearInterval(this.timer);
      this.save();
      this.setArtworkInfo(null);
      next();
    } else if (this.confirm.closeable === null) {
      this.confirm.show = true;
      next(false);
      return;
    } else {
      next(false);
    }
  },
  components: {
    HeaderBar,
    Draw,
    BrushList,
    Push,
    Sidebar,
    Comfirm
  }
};
</script>

<style lang="scss" scoped>
.edit {
  height: 100vh;
  overflow: hidden;
}
</style>
