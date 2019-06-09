<template>
  <div class="edit">
    <header-bar></header-bar>
    <draw></draw>
    <brush-list></brush-list>
  </div>
</template>

<script>
import HeaderBar from "@/components/edit/header-bar";
import Draw from "@/components/edit/draw";
import BrushList from "@/components/edit/brush-list";
export default {
  data() {
    return {};
  },
  components: {
    HeaderBar,
    Draw,
    BrushList
  }
};
</script>

<style lang="scss" scoped>
</style>
