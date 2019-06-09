<template>
  <div class="edit">
    <header-bar></header-bar>
    <draw></draw>
    <brush-list></brush-list>
    <push></push>
  </div>
</template>

<script>
import HeaderBar from "@/components/edit/header-bar";
import Draw from "@/components/edit/draw";
import BrushList from "@/components/edit/brush-list";
import Push from "@/components/edit/push";
import { saveArtwork } from "@/js/cache";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["artwork"])
  },
  methods: {
    save() {
      console.log("保存绘板数据");
      let artwork = Object.assign({}, this.artwork, {
        updated: Date.now()
      });
      saveArtwork(artwork);
    },
    ...mapMutations(["setArtworkInfo"])
  },
  mounted() {
    if (this.artwork.id) {
      this.save();
      this.timer = setInterval(() => {
        this.save();
      }, 1000 * 30);
    } else {
      this.$router.replace({
        path: "/artwork"
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Do you really want to leave?");
    if (answer) {
      clearInterval(this.timer);
      this.setArtworkInfo({});
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
