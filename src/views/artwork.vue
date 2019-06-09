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
export default {
  data() {
    return {
      isNewCanvasShow: false,
      artworks: [
        {
          id: "c6c07bca-3245-4af9-861b-76118a7fb3cc",
          title: "New Canvas3",
          size: 96,
          created: 1560102980724,
          updated: 1560103790814,
          brush: {
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
          canvasData: [],
          currentBrushColor: "#f0f3c0"
        },
        {
          id: "e4cc159d-6e79-4f4d-92ad-fd083e71953f",
          title: "New Canvas2",
          size: 16,
          created: 1560099602758,
          updated: 1560102588782,
          brush: {
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
          currentBrushColor: "#7395c0",
          canvasData: []
        },
        {
          id: "6638f587-6c02-4a71-b3ff-837a7e7009d5",
          title: "New Canvas1",
          size: 32,
          created: 1560099479718,
          updated: 1560102708130,
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
          currentBrushColor: "#c2f0b1",
          canvasData: []
        }
      ]
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
      this.artworks.forEach(artwork => {
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
