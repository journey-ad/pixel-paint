<template>
  <div class="artwork" :class="{'disable-move': isNewCanvasShow}">
    <add-new @toggleNewCanvasShow="toggleNewCanvasShow"></add-new>
    <div class="artwork-list">
      <canvas-item
        v-for="(item,index) in artwork"
        :key="index"
        :title="item.title"
        :size="item.size"
        :created="item.created"
        :brushes="item.brushes"
      ></canvas-item>
    </div>
    <new-canvas v-if="isNewCanvasShow" @toggleNewCanvasShow="toggleNewCanvasShow"></new-canvas>
  </div>
</template>

<script>
import AddNew from "@/components/artwork/add-new";
import CanvasItem from "@/components/artwork/canvas-item";
import NewCanvas from "@/components/artwork/new-canvas";
export default {
  data() {
    return {
      isNewCanvasShow: false,
      artwork: [
        // mock data
        {
          title: "Canvas1",
          size: 16,
          created: 1231231321,
          brushes: [
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
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: [
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
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
        },
        {
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
        },
        {
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
        },
        {
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
        },
        {
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
        },
        {
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
        },
        {
          title: "Canvas1",
          size: 32,
          created: 1231231321,
          brushes: this.getRandomColor()
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
  mounted() {},
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
