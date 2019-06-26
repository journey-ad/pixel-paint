<template>
  <div class="artwork" :class="{'disable-move': isNewCanvasShow}">
    <add-new @toggleNewCanvasShow="toggleNewCanvasShow"></add-new>
    <div class="artwork-list">
      <canvas-item
        v-for="(artwork,index) in artworks"
        :key="index"
        :artwork="artwork"
        @onDeleteArtwork="onDeleteArtwork"
        @onRenameArtwork="onRenameArtwork"
      ></canvas-item>
    </div>
    <new-canvas v-if="isNewCanvasShow" @toggleNewCanvasShow="toggleNewCanvasShow"></new-canvas>
    <rename
      v-if="isRenameShow"
      title="Rename"
      :value="artwork.title"
      @ok="setArtworkTitle"
      @close="setRenameShow(false)"
    ></rename>
    <confirm
      v-if="isConfirmShow"
      title="Confirm"
      content="!!! Do you really want to delete this artwork? !!!"
      @return="confirmReturn"
    ></confirm>
  </div>
</template>

<script>
import AddNew from "@/components/artwork/add-new";
import CanvasItem from "@/components/artwork/canvas-item";
import NewCanvas from "@/components/artwork/new-canvas";
import Rename from "@/components/common/prompt";
import Confirm from "@/components/common/confirm";
import { loadArtwork, saveArtwork, deleteArtwork } from "@/js/cache";
const mock = require("../assets/artwork.json");
export default {
  data() {
    return {
      isNewCanvasShow: false,
      artworks: [],
      activeID: "",
      isRenameShow: false,
      isConfirmShow: false
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
    },
    onDeleteArtwork(id) {
      this.activeID = id;
      this.isConfirmShow = true;
    },
    confirmReturn(flag) {
      this.isConfirmShow = false;
      if (flag) {
        console.log("确认删除作品", this.activeID);
        deleteArtwork(this.activeID);
        this.init();
        this.$Alert({
          title: "Info",
          content: `This artwork(${this.activeID}) is deleted.`
        });
        this.activeID = "";
      }
    },
    onRenameArtwork(id) {
      this.activeID = id;
      // this.setRenameShow(true);
      this.$Alert({
        title: "Info",
        content: `This feature is under development.`
      });
    },
    setRenameShow(flag) {
      this.isRenameShow = flag;
    },
    setArtworkTitle(title) {
      console.log(title);
      this.$Alert({
        title: "Success",
        content: `New artwork name ${title} saved.`
      });
      // this.setArtworkInfo({
      //   title
      // });
      // this.$emit("saveArtwork");
    },
    init() {
      if (loadArtwork()) {
        this.artworks = loadArtwork();
      } else {
        this.artworks = mock;
        mock.forEach(artwork => {
          saveArtwork(artwork);
        });
      }
    }
  },
  mounted() {
    this.init();
  },
  components: {
    AddNew,
    CanvasItem,
    NewCanvas,
    Rename,
    Confirm
  }
};
</script>

<style lang="scss" scoped>
.disable-move {
  position: fixed;
  width: 100vw;
}
</style>
