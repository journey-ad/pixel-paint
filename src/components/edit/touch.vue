<template>
  <div
    class="touch"
    ref="touch"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  ></div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      start: [], // 开始触摸时的坐标
      now: [], // 当前坐标
      scale: 1 // 相对于上次的缩放比例
    };
  },
  methods: {
    getDistance(p1, p2) { // 计算两点距离
      let x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    getMidpoint(p1, p2) { // 计算中点坐标
      var x = (p1.pageX + p2.pageX) / 2,
        y = (p1.pageY + p2.pageY) / 2;
      return { x, y };
    },
    touchstart(e) { // 触摸开始事件处理
      this.start = e.targetTouches; // 保存触摸开始点坐标

      let type;
      if (e.targetTouches.length === 1) { // 记录事件种类
        type = "touch"; // 一个点为触摸
      } else if (e.targetTouches.length >= 1) {
        type = "pinch"; // 一个点以上为手势
      }

      if (type === "pinch") { // 为手势
        let midpoint = this.getMidpoint(this.start[0], this.start[1]); // 计算中点
        this.$emit("pinchzoomstart", { start: this.start, midpoint }); // 触发pincezoomstart事件, 传入开始点和中点坐标
      } else if (type === "touch") { // 为触摸
        this.$emit("movestart", this.start[0]); // 触发movestart事件, 传入开始点坐标
      }
    },
    touchmove: _.throttle(function(e) { // 触摸移动事件处理
      // console.log(e)
      this.now = e.targetTouches; // 保存当前点坐标

      let type;
      if (e.targetTouches.length === 1) {
        type = "touch";
      } else if (e.targetTouches.length >= 1) {
        type = "pinch";
      }

      if (type === "pinch") {
        let scale =
          this.getDistance(this.now[0], this.now[1]) /
          this.getDistance(this.start[0], this.start[1]); // 计算本次和上次手势事件双指距离的比

        this.$emit("pinchzoomchange", { scale: scale - this.scale }); // 触发pinchzoomchange事件, 传入上述比值

        this.scale = scale; // 记录比值供下次对比
      } else if (type === "touch") {
        this.$emit("movechange", { // 触发movechange事件, 传入变化坐标偏移
          x: this.now[0].clientX - this.start[0].clientX,
          y: this.now[0].clientY - this.start[0].clientY
        });
        this.start = this.now; // 借用this.start保存本次坐标供下次比对
      }
    }, 50), // 节流函数
    touchend(e) { // 触摸结束事件处理
    // TODO: 似乎不生效, 待修正
      let type;
      if (e.targetTouches.length === 1) {
        type = "touch";
      } else if (e.targetTouches.length >= 1) {
        type = "pinch";
      }

      if (type === "pinch") {
        this.now = e.targetTouches;

        this.$emit("pinchzoomend", this.now);
      } else if (type === "touch") {
        this.$emit("moveend", e.targetTouches[0]);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.touch {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
