<template>
  <div class="grid-highlight" :style="style"></div>
</template>

<script>
export default {
  props: ["width", "size", "offset"],
  computed: {
    single() {
      return this.width / this.size;
    },
    trans() {
      return {
        x: this.getOffset(this.offset.x, this.single),
        y: this.getOffset(this.offset.y, this.single)
      };
    },
    style() {
      return {
        width: `${this.single}px`,
        height: `${this.single}px`,
        transform: `translate3d(${this.trans.x}px, ${this.trans.y}px, 0)`
      };
    }
  },
  methods: {
    getOffset(max, step) {
      if (max === 0 || step === 0) return 0;

      let result = 0;
      while (result + step < max) {
        result += step;
      }

      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-highlight {
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid rgba(255, 0, 0, 0.5);
  box-sizing: border-box;
}
</style>
