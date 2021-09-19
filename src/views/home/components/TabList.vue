<template>
  <div class="container fixed top-4 right-4 z-50" style="width: 40px">
    <div
      class="item flex justify-center items-center mb-3 duration-500 relative"
      v-for="(item, index) in tagsList"
      :key="index"
      @mouseenter="showFlag(index)"
      @mouseleave="hiddenFlag(index)"
      @click="goPage(item)"
    >
      <span :class="item.icon" :style="{ fontSize: item.size + 'px' }"></span>
      <transition name="left">
        <div
          class="hover_box absolute top-0 flex items-center justify-center"
          v-if="item.isHover"
        >{{ item.title }}</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'TabList',
  setup() {
    const router = useRouter()
    let tagsList = reactive([
      {
        icon: 'iconfont icon-mayun1',
        size: 25,
        title: '码云',
        url: 'https://gitee.com/ymshen',
        type: 'web',
        isHover: false
      },
      {
        icon: 'iconfont icon-houtai1',
        size: 23,
        title: '后台管理',
        // url: 'https://gitee.com/ymshen'
        type: 'localhost',
        isHover: false
      },
      {
        icon: 'iconfont icon-qq1',
        size: 25,
        title: '2896583081',
        type: 'copy',
        isHover: false
      },
      {
        icon: 'iconfont icon-github',
        size: 26,
        title: 'github',
        url: 'https://github.com/lijinshen-ym',
        type: 'web',
        isHover: false
      },
      {
        icon: 'iconfont icon-youxiang1',
        size: 24,
        title: '18824454802@163.com',
        type: 'copy',
        isHover: false
      },
      {
        icon: 'iconfont icon-blog1',
        size: 26,
        title: '博客',
        url: '/blog/index',
        type: 'localhost',
        isHover: false
      }
    ])
    function showFlag(index) {
      if (tagsList[index].isHover == false || tagsList[index].isHover) {
        let list = tagsList
        list[index].isHover = true
        tagsList = list
      }
    }
    function hiddenFlag(index) {
      if (tagsList[index].isHover == false || tagsList[index].isHover) {
        let list = tagsList
        list[index].isHover = false
        tagsList = list
      }
    }
    function goPage(item) {
      console.log(item)
      switch (item.type) {
        case 'copy':
          break
        case 'localhost':
          router.push(item.url)
          break
        default:
          window.open(item.url)
      }
    }
    return {
      tagsList,
      showFlag,
      hiddenFlag,
      goPage
    }
  }
})
</script>

<style lang="scss" scoped>
.item {
  height: 36px;
  width: 36px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.item:hover {
  cursor: pointer;
}
.active:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.iconfont {
  color: rgba(255, 255, 255, 0.8);
}
.hover_box {
  font-size: 14px;
  padding: 0 4px;
  height: 36px;
  right: 42px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 999;
  min-width: 90px;
  white-space: nowrap;
}

.hover_box:after {
  content: '';
  position: absolute;
  right: -13px;
  top: 10px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-left: 6px solid rgba(255, 255, 255, 0.7);
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.left-enter-active,
.left-leave-active {
  transition: all 0.6s ease;
}
.left-enter-to,
.left-leave-from {
  opacity: 1;
}
.left-enter-from,
.left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
