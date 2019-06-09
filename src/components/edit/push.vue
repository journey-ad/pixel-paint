<template>
  <div
    class="push"
    @touchstart="push(true)"
    @touchend="push(false)"
    @mousedown="push(true)"
    @mouseup="push(false)"
    @contextmenu.prevent
  >
    <div class="top" :class="{active: isPushing}">
      <icon class="push-icon" name="push"></icon>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isPushing"])
  },
  methods: {
    push(flag) {
      console.log(`${flag ? "开始" : "结束"}绘制`);
      this.setPushing(flag);
    },
    ...mapMutations(["setPushing"])
  }
};
</script>

<style lang="scss" scoped>
.push {
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 370px;
  height: 120px;
  background: $push-color;
  border: 2px solid $border-color-push;
  border-radius: 8px;
  .top {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 105px;
    background: $white-color;
    border: 2px solid $border-color-push;
    border-radius: 8px;
    &.active {
      bottom: 0;
    }
    .push-icon {
      width: 120px;
      height: 40px;
    }
  }
}
</style>
