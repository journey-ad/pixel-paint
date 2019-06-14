<template>
  <div class="grid" ref="grid" :style="{backgroundImage: `url('${svg}'`}"></div>
</template>

<script>
export default {
  props: ["size"],
  data() {
    return {
      svg: ""
    };
  },
  watch: {
    size(newVal) {
      this.getSvg();
    }
  },
  methods: {
    getBlob(data) {
      return window.URL.createObjectURL(data);
    },
    getSvgData(width) {
      let svgData = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="smallGrid" width="${width}" height="${width}" patternUnits="userSpaceOnUse">
                        <path d="M ${width} 0 L 0 0 0 ${width}" fill="none" stroke="#666" stroke-width="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>`;

      return new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8"
      });
    },
    getSvg() {
      this.$nextTick(() => {
        let width = this.$refs.grid.clientWidth / this.size;

        let svgData = this.getSvgData(width);

        this.svg = this.getBlob(svgData);
      });
    }
  },
  mounted() {
    this.getSvg();
  }
};
</script>

<style lang="scss" scoped>
.grid {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
