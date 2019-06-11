<template>
  <div class="prompt">
    <div class="title">{{title}}</div>
    <input type="text" class="text" v-model="text">
    <div class="buttons">
      <div class="btn cancle" @click="close">Cancle</div>
      <div class="btn ok" @click="ok">OK</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  data() {
    return {
      text: ""
    };
  },
  methods: {
    ok() {
      this.$emit("ok", this.text);
      this.close();
    },
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    this.text = this.value;
  }
};
</script>

<style lang="scss" scoped>
.prompt {
  position: absolute;
  width: 315px;
  height: 140px;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: 25vh auto;
  background: $white-color;
  .title {
    font-size: 20px;
    line-height: 44px;
    padding-left: 10px;
    border-bottom: 1px solid $border-color-sidebar;
  }
  .text {
    font-size: 18px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid $border-color-sidebar;
    padding: 16px 0 2px 6px;
    margin: 0 6px;
  }
  .buttons {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    .btn {
      border: 2px solid $border-color-sidebar;
      border-radius: 8px;
      padding: 6px 10px;
      margin: 4px 6px;
    }
  }
}
</style>
