<template>
  <div class="artwork" :class="{'disable-move': isNewCanvasShow}">
    <add-new @toggleNewCanvasShow="toggleNewCanvasShow"></add-new>
    <div class="artwork-list">
      <canvas-item v-for="(artwork,index) in artworks" :key="index" :artwork="artwork"></canvas-item>
    </div>
    <new-canvas v-if="isNewCanvasShow" @toggleNewCanvasShow="toggleNewCanvasShow"></new-canvas>
  </div>
</template>

<script>
import AddNew from "@/components/artwork/add-new";
import CanvasItem from "@/components/artwork/canvas-item";
import NewCanvas from "@/components/artwork/new-canvas";
import { loadArtwork, saveArtwork } from "@/js/cache";
const mock = require("../assets/artwork.json");
export default {
  data() {
    return {
      isNewCanvasShow: false,
      artworks: []
    };
  },
  methods: {
    toggleNewCanvasShow(flag) {
      this.isNewCanvasShow = flag || false;
    },
    getRandomColor() {
      let result = [];
      for (let i = 0; i < 16; i++) {
        result.push("#" + ((Math.random() * 0xffffff) << 0).toString(16));
      }
      return result;
    }
  },
  mounted() {
    if (loadArtwork()) {
      this.artworks = loadArtwork();
    } else {
      this.artworks = mock;
      mock.forEach(artwork => {
        saveArtwork(artwork);
      });
    }
  },
  components: {
    AddNew,
    CanvasItem,
    NewCanvas
  }
};
</script>

<style lang="scss" scoped>
.disable-move {
  position: fixed;
  width: 100vw;
}
</style>
