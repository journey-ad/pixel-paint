<template>
  <div class="draw">
    <canvas ref="canvas"></canvas>
    <div class="meta" v-if="!artwork.canvasData || !artwork.canvasData.length">
      NO DATA :-(
      <br>
      <br>
      id: {{artwork.id}}
      <br>
      title: {{artwork.title}}
      <br>
      size: {{artwork.size}}
      <br>
      created: {{artwork.created}}
      <br>
      updated: {{artwork.updated}}
      <br>
      brush title: {{artwork.brush.title}}
    </div>
    <grid v-if="loaded && isGridShow" :size="viewportSize"></grid>
    <grid-highlight v-if="loaded" :width="widthView" :size="viewportSize" :offset="cursorOffset"></grid-highlight>
    <cursor-point v-if="loaded" :offset="cursorOffset"></cursor-point>
    <touch
      @pinchzoomstart="pinchzoomstart"
      @pinchzoomchange="pinchzoomchange"
      @pinchzoomend="pinchzoomend"
      @movechange="movechange"
    ></touch>
  </div>
</template>

<script>
import Grid from "./grid";
import GridHighlight from "./grid-highlight";
import CursorPoint from "./cursor";
import Touch from "./touch";
import { mapState, mapMutations, mapGetters } from "vuex";
import { clearInterval } from "timers";
export default {
  data() {
    return {
      loaded: false,
      midpoint: null, // 双指手势中点坐标
      viewportOffset: { x: 0, y: 0 }, // 真实画布视口偏移值
      cursorOffset: { x: 0, y: 0 } // 游标偏移值
    };
  },
  computed: {
    canvasView() {
      return this.$refs.canvas; // 显示画布dom
    },
    ctxView() {
      return this.canvasView.getContext("2d"); // 显示画布 canvas 2d上下文
    },
    widthView() {
      return this.canvasView ? this.canvasView.clientWidth : -1; // 显示画布宽度
    },
    canvasData() {
      return this.artwork.canvasData; // 作品点数据
    },
    ctx() {
      return this.canvas.getContext("2d"); // 真实画布 canvas 2d 上下文
    },
    ...mapState(["canvas", "artwork", "isGridShow", "isPushing"]),
    ...mapGetters(["viewportSize"])
  },
  watch: {
    viewportOffset: {
      handler(val) {
        this.drawCanvasView(); // 视口发生变化后重新渲染显示画布
        this.setViewportOffset(val);
      },
      deep: true // 偏移值为对象, 需进行深度监测
    },
    canvasData() {
      console.log("画布数据改变, 重绘画板");
      this.drawCanvas();
    }
  },
  methods: {
    limit(num, min, max) {
      return Math.min(Math.max(min, num), max);
    },
    pinchzoomstart(e) {
      // 开始缩放手势
      // console.log(e);
      this.midpoint = {
        x: Math.floor((e.midpoint.x / this.widthView) * this.artwork.size), // 计算得到双指中点坐标
        y: Math.floor((e.midpoint.y / this.widthView) * this.artwork.size)
      };
    },
    pinchzoomchange(e) {
      // console.log(e);

      if (e.scale > 0.01 || e.scale < -0.01) {
        // 防抖,仅当每次移动坐标比例超过一定值才进行相应操作
        if (e.scale > 0) {
          this.setViewportSize(this.viewportSize - 2); // 为放大手势则真实画布视口尺寸-1
        } else if (e.scale < 0) {
          this.setViewportSize(this.viewportSize + 2); // 为缩小手势则视口尺寸+1
        }

        let max = this.artwork.size - this.viewportSize; // 限制视口范围

        this.viewportOffset = {
          // 通过中点坐标和视口尺寸得到视口左上角点偏移值
          x: this.limit(
            Math.floor(this.midpoint.x - this.viewportSize / 2),
            0,
            max
          ),
          y: this.limit(
            Math.floor(this.midpoint.y - this.viewportSize / 2),
            0,
            max
          )
        };
      }
    },
    pinchzoomend(e) {
      // console.log(e);
    },
    movechange(e) {
      // 触摸操作移动
      let offset = {
          x: this.cursorOffset.x + e.x, // 计算此次移动后游标的偏移值
          y: this.cursorOffset.y + e.y
        },
        min = this.widthView * 0.12, // 限制游标范围为显示画布0.12~0.88倍宽高内的部分
        max = this.widthView * 0.88,
        viewMax = this.artwork.size - this.viewportSize; // 限制真实画布视口范围

      if (offset.x <= min)
        this.viewportOffset.x = this.limit(
          (this.viewportOffset.x -= 2),
          0,
          viewMax
        ); // 当游标移动趋势为范围外时改变视口偏移值

      if (offset.x >= max)
        this.viewportOffset.x = this.limit(
          (this.viewportOffset.x += 2),
          0,
          viewMax
        );

      if (offset.y <= min)
        this.viewportOffset.y = this.limit(
          (this.viewportOffset.y -= 2),
          0,
          viewMax
        );

      if (offset.y >= max)
        this.viewportOffset.y = this.limit(
          (this.viewportOffset.y += 2),
          0,
          viewMax
        );

      if (
        this.viewportOffset.x <= 0 ||
        this.viewportOffset.x >= viewMax ||
        this.viewportOffset.y <= 0 ||
        this.viewportOffset.y >= viewMax
      ) {
        min = 0; // 当视口在边缘时解除游标移动范围限制
        max = this.widthView;
      }

      this.cursorOffset = {
        x: this.limit(offset.x, min, max), // 移动游标
        y: this.limit(offset.y, min, max)
      };
    },
    drawCanvas() {
      // 真实画布, 尺寸为作品尺寸, 保存在内存
      if (!this.canvasData || !this.widthView) return;

      this.ctx.clearRect(0, 0, this.artwork.size, this.artwork.size); // 清空画布

      let offset_x = 0, // 当前点的偏移值
        offset_y = 0;

      for (let x = 0; x < this.canvasData.length; x++) {
        for (let y = 0; y < this.canvasData[x].length; y++) {
          // 逐行逐列遍历点
          let color = this.canvasData[x][y] || '#ffffff'; // 取到色值

          this.ctx.fillStyle = color; // 设置填充颜色
          this.ctx.fillRect(offset_x, offset_y, 1, 1); // 填充一个像素
          offset_x += 1; // 移动到右侧点
          // console.log(offset_x, offset_y);
        }
        offset_x = 0; // 换行重置行偏移为0
        offset_y += 1; // 换行
      }

      this.drawCanvasView(); // 绘制显示画布

      // this.raf = requestAnimationFrame(() => {
      //   this.drawCanvas();
      // });
    },
    drawCanvasView() {
      // 显示画布, 尺寸与屏幕宽度有关, 为真实dom
      if (!this.canvasData || this.widthView === -1) return;

      this.canvasView.width = this.canvasView.height = this.widthView; // 设置画布尺寸为css尺寸

      this.ctxView.clearRect(0, 0, this.widthView, this.widthView); // 清空画布

      this.ctxView.mozImageSmoothingEnabled = false; // 不进行平滑处理, 以适应像素风格
      this.ctxView.webkitImageSmoothingEnabled = false;
      this.ctxView.msImageSmoothingEnabled = false;
      this.ctxView.imageSmoothingEnabled = false;

      this.ctxView.drawImage(
        // 使用drawImage从真实画布复制图像内容
        this.canvas,
        this.viewportOffset.x, // 视口偏移值
        this.viewportOffset.y,
        this.viewportSize, // 视口大小
        this.viewportSize,
        0,
        0,
        this.widthView,
        this.widthView
      );
    },
    init() {
      this.setViewportSize(this.artwork.size); // 设置默认视口大小为作品尺寸
      this.drawCanvas(); // 绘制真实画布
      this.timer = setInterval(() => {
        this.updateThumb(this.canvas.toDataURL()); // 每隔1000ms生成一次预览图
      }, 1000);
      this.cursorOffset = {
        x: this.widthView * 0.5, // 设置游标默认位置为正中
        y: this.widthView * 0.5
      };

      this.loaded = true;
    },
    ...mapMutations([
      "setArtworkInfo",
      "updateThumb",
      "setViewportSize",
      "setViewportOffset"
    ])
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    // cancelAnimationFrame(this.raf);
    window.clearInterval(this.timer); // 组件销毁前移除定时器
  },
  components: {
    Grid,
    GridHighlight,
    CursorPoint,
    Touch
  }
};
</script>

<style lang="scss" scoped>
.draw {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 368px;
  height: 368px;
  margin: 4px auto;
  border: 2px solid $black-color;
  canvas {
    width: 100%;
    height: 100%;
  }
  .meta {
    position: absolute;
    color: $black-color;
    font-size: 12px;
  }
}
</style>
