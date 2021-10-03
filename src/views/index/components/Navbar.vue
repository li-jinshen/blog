<template>
  <div class="navbar_box fixed top-0 z-20 flex justify-center items-center">
    <div class="h-full navbar_inner w-full flex">
      <div
        class="navbar_left text-center h-full cursor-pointer"
        style="overflow:hidden;box-sizing: border-box;margin-left:5px"
      >
        <span class="iconfont icon-boke" style="font-size:50px;" @click="goPage('/')"></span>
      </div>
      <div class="navbar_center flex items-center mx-16">
        <div
          v-for="(item,index) in menu"
          :key="index"
          style="width:100px"
          class="flex items-center justify-center cursor-pointer h-full"
          @click="changeTab(index)"
        >
          <div :class="tabIndex == index?'text-primary':''" class="duration-500 hover:text-primary">
            <span :class="item.icon" :style="{'font-size':item.size +'px'}"></span>
            <span class="pl-1">{{item.name}}</span>
          </div>
        </div>
        <div class="bottom_border rounded" :style="{left:left+'px'}"></div>
      </div>
      <div class="navbar_right flex items-center">
        <div style="width:42px" class="flex justify-center items-center h-full">
          <span
            class="iconfont icon-index-active cursor-pointer"
            style="font-size:21px"
            @click="goPage('/')"
          ></span>
        </div>
        <div style="width:40px" class="flex justify-center items-center h-full mx-4">
          <span
            class="iconfont icon-xingtaiduICON_sousuo-- cursor-pointer"
            style="font-size:21px"
            @click="openSearch"
          ></span>
        </div>
        <div style="width:40px" class="flex justify-center items-center h-full">
          <span class="iconfont icon-yonghu cursor-pointer" style="font-size:24px"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import mitt from '../../../common/EventBus'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    let left = ref(10)
    let tabIndex = ref(0)
    let menu = reactive([
      // {
      //   name: '首页',
      //   path: '/blog/home',
      //   icon: 'iconfont icon-index-active',
      //   size: 20
      // },
      {
        name: '博客',
        path: '/blog/index',
        icon: 'iconfont icon-blog',
        size: 20
      },
      {
        name: '归档',
        path: '/blog/index/archive',
        icon: 'iconfont icon-guidang1',
        size: 20
      },
      {
        name: '留言',
        path: '/blog/index/comment',
        icon: 'iconfont icon-liuyan1',
        size: 20
      }
    ])

    let goPage = function (path) {
      router.push({ path })
    }

    let openSearch = function () {
      //   console.log('点击了搜索', mitt)
      mitt.emit('openSearch')
    }
    let changeTab = function (index) {
      tabIndex.value = index
      left.value = index * 100 + 10
      // goPage(menu[index].path)
    }

    return {
      left,
      menu,
      tabIndex,
      goPage,
      openSearch,
      changeTab
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar_box {
  user-select: none;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0.0625rem 0.3125rem 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(1.0375rem);
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.18);

  .navbar_inner {
    max-width: 81.25rem;
    width: 100%;
    .navbar_left {
      width: 5rem;
    }
    .navbar_center {
      flex: 1;
      position: relative;
      .bottom_border {
        width: 80px;
        padding: 0px 10px;
        height: 0.25rem;
        background: var(--primary);
        position: absolute;
        bottom: 0;
        transition: 0.5s;
      }
    }
    .navbar_right {
      width: 6rem;
    }
  }
}
</style>
