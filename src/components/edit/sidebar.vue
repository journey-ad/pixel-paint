<template>
  <transition name="sidebar-fade">
    <div class="sidebar" v-if="isSidebarShow" @click.self="hideSidebar">
      <div class="container">
        <div class="header">
          <div class="thumb" :style="{backgroundImage: `url('${artwork.thumb}'`}"></div>
          <div class="info">
            <div class="title">{{artwork.title}}</div>
            <div class="size">Size: {{`${artwork.size} x ${artwork.size}`}}</div>
            <div class="date">Created At: {{formatDate(artwork.created)}}</div>
          </div>
        </div>
        <div class="menu">
          <div
            class="item"
            @click="actionHandle(item.action)"
            v-for="(item, index) in menu"
            :key="index"
          >
            <icon class="icon" :name="item.icon"></icon>
            <span class="text">{{item.text}}</span>
          </div>
        </div>
      </div>
      <rename
        v-if="isRenameShow"
        title="Rename"
        :value="artwork.title"
        @ok="setArtworkTitle"
        @close="setRenameShow(false)"
      ></rename>
    </div>
  </transition>
</template>

<script>
import Rename from "@/components/common/prompt";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  props: ["isSidebarShow"],
  data() {
    return {
      isRenameShow: false,
      menu: [
        {
          icon: "rename",
          text: "Rename",
          action: "rename"
        },
        {
          icon: "clear",
          text: "Clear",
          action: "clear"
        },
        {
          icon: "export",
          text: "Export",
          action: "export"
        },
        {
          icon: "share",
          text: "Share",
          action: "share"
        }
      ]
    };
  },
  computed: {
    ...mapState(["artwork"])
  },
  methods: {
    actionHandle(action) {
      switch (action) {
        case "rename":
          console.log("rename");
          this.setRenameShow(true);
        case "clear":

        case "export":

        case "share":
      }
    },
    hideSidebar() {
      this.setRenameShow(false);
      this.$emit("toggleSidebarShow", false);
    },
    setRenameShow(flag) {
      this.isRenameShow = flag;
    },
    setArtworkTitle(title) {
      console.log(title);
      this.$Alert({
        title: "Success",
        content: `New artwork name ${title} saved.`
      });
      this.setArtworkInfo({
        title
      });
      this.$emit("saveArtwork");
    },
    formatDate(ts) {
      return moment(ts).format("YYYY-MM-DD HH:mm:ss");
    },
    ...mapMutations(["setArtworkInfo"])
  },
  components: {
    Rename
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $background-color-overlay;
  .container {
    position: absolute;
    display: flex;
    flex-direction: column;
    color: $text-color;
    background: $background-color-sidebar;
    width: 206px;
    height: 100%;
    .header {
      display: flex;
      border-bottom: 1px solid $border-color-sidebar;
      .thumb {
        width: 78px;
        height: 78px;
        margin: 4px;
        background-size: contain;
      }
      .info {
        flex: 1;
        padding: 6px 0 0 6px;
        .title {
          font-size: 14px;
        }

        .size,
        .date {
          font-size: 12px;
          padding: 4px 0;
        }
      }
    }
    .menu {
      .item {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 56px;
        .icon {
          width: 28px;
          height: 28px;
          margin: 0 16px;
        }
      }
    }
  }
}
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: all 0.2s;
  .container {
    transition: left 0.2s linear;
  }
}
.sidebar-fade-enter,
.sidebar-fade-leave-to {
  background: transparent;
  .container {
    left: -206px;
    transition: left 0.2s linear;
  }
}
.sidebar-fade-enter-to,
.sidebar-fade-leave {
  background: $background-color-overlay;
  .container {
    left: 0px;
  }
}
</style>
