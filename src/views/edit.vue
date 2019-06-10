<template>
  <div class="edit" v-if="artwork.id">
    <header-bar :thumb="artwork.thumb"></header-bar>
    <draw v-if="canvas"></draw>
    <brush-list></brush-list>
    <push></push>
  </div>
</template>

<script>
import HeaderBar from "@/components/edit/header-bar";
import Draw from "@/components/edit/draw";
import BrushList from "@/components/edit/brush-list";
import Push from "@/components/edit/push";
import { mapState, mapMutations } from "vuex";
import { saveArtwork } from "@/js/cache";
export default {
  data() {
    return {
      canvas: null,
      ctx: null
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
      }, 1000 * 10);
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer =
      !this.artwork.id || window.confirm("Do you really want to leave?");
    if (answer) {
      clearInterval(this.timer);
      this.setArtworkInfo(null);
      next();
    } else {
      next(false);
    }
  },
  components: {
    HeaderBar,
    Draw,
    BrushList,
    Push
  }
};
</script>

<style lang="scss" scoped>
.edit {
  height: 100vh;
  overflow: hidden;
}
</style>
