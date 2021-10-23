<template>
  <transition name="top">
    <div class="fixed top-0 z-20 flex items-center justify-center navbar_box" v-if="showNavbar">
      <div class="flex w-full h-full navbar_inner">
        <div
          class="h-full text-center cursor-pointer navbar_left"
          style="overflow:hidden;box-sizing: border-box;margin-left:5px"
        >
          <span class="iconfont icon-boke" style="font-size:50px;" @click="goPage('/')"></span>
        </div>
        <div class="flex items-center mx-16 navbar_center">
          <div
            v-for="(item,index) in menu"
            :key="index"
            style="width:100px"
            class="flex items-center justify-center h-full cursor-pointer"
            @click="changeTab(index)"
          >
            <div
              :class="tabIndex == index ? 'text-primary' : ''"
              class="duration-500 hover:text-primary"
            >
              <span :class="item.icon" :style="{ 'font-size': item.size + 'px' }"></span>
              <span class="pl-1">{{ item.name }}</span>
            </div>
          </div>
          <div class="rounded bottom_border" :style="{ left: left + 'px' }" v-if="tabIndex != -1"></div>
        </div>
        <div class="flex items-center navbar_right">
          <div style="width:42px" class="flex items-center justify-center h-full">
            <span
              class="cursor-pointer iconfont icon-index-active"
              style="font-size:21px"
              @click="goPage('/')"
            ></span>
          </div>
          <div style="width:40px" class="flex items-center justify-center h-full mx-4">
            <span
              class="cursor-pointer iconfont icon-xingtaiduICON_sousuo--"
              style="font-size:21px"
              @click="openSearch"
            ></span>
          </div>
          <div style="width:40px" class="flex items-center justify-center h-full">
            <span
              class="cursor-pointer iconfont icon-yonghu"
              style="font-size:24px"
              @click="loginIn"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, reactive, onMounted, toRefs } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import mitt from '../../../common/EventBus'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    let left = ref(10)
    let tabIndex = ref(0)
    let state = reactive({
      showNavbar: false
    })
    let menu = reactive([
      {
        name: '博客',
        path: '/blog/index/common/list',
        icon: 'iconfont icon-blog',
        size: 20
      },
      {
        name: '归档',
        path: '/blog/index/common/archive',
        icon: 'iconfont icon-guidang1',
        size: 20
      },
      {
        name: '留言',
        path: '/blog/index/common/comment',
        icon: 'iconfont icon-liuyan1',
        size: 20
      }
    ])

    // 页面刷新时判断路径
    onMounted(() => {
      refresh()
      state.showNavbar = true
    })
    onBeforeRouteUpdate((to) => {
      refresh(to)
    })
    const refresh = (to) => {
      let fullPath = to ? to.fullPath : route.fullPath
      let index = menu.findIndex((item) => {
        return fullPath === item.path
      })
      tabIndex.value = index
      console.log('index', tabIndex.value)
      left.value = index * 100 + 10
    }

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
      goPage(menu[index].path)
    }

    const loginIn = () => {
      store.state.loginStatus
        ? router.push({ path: '/blog/admin' })
        : router.push({ path: '/blog/login' })
    }

    return {
      left,
      menu,
      tabIndex,
      goPage,
      openSearch,
      changeTab,
      ...toRefs(state),
      loginIn
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
