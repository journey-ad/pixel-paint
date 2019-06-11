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
      this.canvas.width = 128;
      this.canvas.height = 128;

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
