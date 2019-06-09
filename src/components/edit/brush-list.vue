<template>
  <div class="brush-list" ref="brushList">
    <icon
      class="brush"
      name="brush"
      :style="{color: color}"
      :index="String(index)"
      :currentIndex="String(currentIndex)"
      v-for="(color, index) in brush.colors || Array(16).fill('#9b9b9b')"
      :key="index"
      @touchstart.native="selectStart"
      @touchmove.native="selectMove"
      @touchend.native="selectEnd"
      @click.native="selectStart"
      @mouseup.native="selectEnd"
    ></icon>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      currentIndex: 0,
      width: -1
    };
  },
  computed: {
    ...mapState(["brush"])
  },
  methods: {
    computedIndex(e) {
      // console.log(e);
      const target = e.touches || [e]; // 兼容鼠标点击事件
      const clientX = target[0].clientX; // 得到X坐标偏移值
      if (clientX < 0 || clientX > this.width) return; // 忽略画笔列表区域外部分

      const index = Math.floor((clientX / this.width / (10 / 16)) * 10); // 通过 X坐标偏移值与画笔列表宽度的比值 和 画笔数量 计算出当前选择项的索引值

      if (this.currentIndex !== index) this.currentIndex = index; // 更新当前索引
    },
    selectStart(e) {
      // console.log("start", e);
      this.width = this.$refs.brushList.clientWidth; // 每次点击或触摸时重新获取画笔列表宽度
      this.computedIndex(e);
    },
    selectMove: _.throttle(function(e) {
      // 使用lodash的节流函数提高性能
      this.computedIndex(e);
    }, 50),
    selectEnd(e) {
      const color = this.brush.colors[this.currentIndex];
      console.log(
        `选择画笔颜色 %c${color}`,
        `background: ${color}; color: ${this.complement(color)}`
      );
      this.setCurrentBrushColor(color);
    },
    complement(hex) {
      return;
      "#" +
        ("000000" + (0xffffff ^ parseInt(hex.slice(1), 16)).toString(16)).slice(
          -6
        );
    },
    ...mapMutations(["setCurrentBrushColor"])
  }
};
</script>

<style lang="scss" scoped>
.brush-list {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  .brush {
    width: 20px;
    height: 220px;
    &.active {
      transform: translateY(-10px);
    }
  }
}
</style>
