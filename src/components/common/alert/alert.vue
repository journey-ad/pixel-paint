<template>
  <div class="alert" v-show="options.show">
    <div class="title">{{options.title}}</div>
    <div class="content">{{options.content}}</div>
    <div
      class="buttons"
      @touchstart="setActive($event.target, true)"
      @touchend="setActive($event.target, false)"
    >
      <div class="btn ok" @click="ok">OK</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        show: false
      }
    };
  },
  methods: {
    show(options) {
      this.options = Object.assign({}, options, { show: true });
    },
    ok() {
      this.options = { show: false };
    },
    setActive(el, flag) {
      flag ? el.classList.add("active") : el.classList.remove("active");
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  width: 315px;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  margin: 25vh auto;
  padding-bottom: 36px;
  color: $black-color;
  background: $white-color;
  border: 2px solid $black-color;
  box-shadow: 4px 4px 0 $black-color;
  .title {
    font-size: 20px;
    line-height: 44px;
    padding-left: 10px;
    border-bottom: 2px solid $border-color-sidebar;
  }
  .content {
    font-size: 18px;
    margin: 10px;
    max-height: 5em;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  .buttons {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    .btn {
      font-size: 18px;
      border: 2px solid $border-color-sidebar;
      padding: 5px 10px;
      margin: 8px 12px;
      box-shadow: 2px 2px 0 $black-color;
      &.active {
        box-shadow: inset 1px 1px 0 #4a4a4a;
        background: $background-color;
        transform: translate(2px, 2px);
      }
    }
  }
}
</style>
