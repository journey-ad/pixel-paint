<template>
  <div class="edit">
    <header-bar></header-bar>
    <draw></draw>
    <brush-list></brush-list>
    <push></push>
  </div>
</template>

<script>
import HeaderBar from "@/components/edit/header-bar";
import Draw from "@/components/edit/draw";
import BrushList from "@/components/edit/brush-list";
import Push from "@/components/edit/push";
export default {
  data() {
    return {};
  },
  components: {
    HeaderBar,
    Draw,
    BrushList,
    Push
  }
};
</script>

<style lang="scss" scoped>
.edit {
  height: 100vh;
  overflow: hidden;
}
</style>
