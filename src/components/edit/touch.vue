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
      rect: {},
      start: [],
      now: [],
      scale: 1
    };
  },
  methods: {
    getDistance(p1, p2) {
      let x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    getMidpoint(p1, p2) {
      var x = (p1.pageX + p2.pageX) / 2,
        y = (p1.pageY + p2.pageY) / 2;
      return { x, y };
    },
    touchstart(e) {
      this.start = e.touches;

      let type;
      if (e.touches.length === 1) {
        type = "touch";
      } else if (e.touches.length >= 1) {
        type = "pinch";
      }

      if (type === "pinch") {
        let midpoint = this.getMidpoint(this.start[0], this.start[1]);

        this.$emit("pinchzoomstart", { start: this.start, midpoint });
      } else if (type === "touch") {
        this.$emit("movestart", e.touches[0]);
      }
    },
    touchmove: _.throttle(function(e) {
      this.now = e.touches;

      let type;
      if (e.touches.length === 1) {
        type = "touch";
      } else if (e.touches.length >= 1) {
        type = "pinch";
      }

      if (type === "pinch") {
        let scale =
          this.getDistance(this.now[0], this.now[1]) /
          this.getDistance(this.start[0], this.start[1]);

        this.$emit("pinchzoomchange", { scale: scale - this.scale });

        this.scale = scale;
      } else if (type === "touch") {
        this.$emit("movechange", {
          x: (this.now[0].clientX - this.start[0].clientX - this.rect.left) / this.rect.width,
          y: (this.now[0].clientY - this.start[0].clientY - this.rect.top) / this.rect.height
        });
      }
    }, 20),
    touchend(e) {
      let type;
      if (e.touches.length === 1) {
        type = "touch";
      } else if (e.touches.length >= 1) {
        type = "pinch";
      }

      if (type === "pinch") {
        this.now = e.touches;

        this.$emit("pinchzoomend", this.now);
      } else if (type === "touch") {
        this.$emit("moveend", e.touches[0]);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rect = this.$refs.touch.getBoundingClientRect();
    });
  }
};
</script>

<style lang="scss" scoped>
.touch {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
