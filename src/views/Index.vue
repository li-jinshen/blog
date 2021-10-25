<template>
  <div class="w-full h-full index" id="indexbox">
    <!-- <Loading></Loading> -->
    <NavBar></NavBar>
    <!-- 占位元素 -->
    <div class="top"></div>
    <div class="flex justify-center pt-2 bottom" id="bottom">
      <div>
        <router-view></router-view>
      </div>
    </div>

    <transition name="index_menu">
      <div class="fixed menu right-4 bottom-8" v-if="showMenu">
        <div class="flex items-center justify-center mb-2 duration-500 menu_item goback">
          <span class="iconfont icon-fanhui" style="font-size:24px" @click="goBack"></span>
        </div>
        <transition name="gotop">
          <div class="flex items-center justify-center menu_item gotop" v-if="showGoTop">
            <span class="iconfont icon-fanhuidingbu" style="font-size:30px" @click="goTop"></span>
          </div>
        </transition>
      </div>
    </transition>

    <!-- 搜索组件 -->
    <Popup :isShow="searchFlag" @close="closeSearch"></Popup>
  </div>
</template>

<script>
import NavBar from './index/components/Navbar.vue'
import Popup from '../components/popup/Popup.vue'
import mitt from '../common/EventBus'
import { ref, onMounted, getCurrentInstance, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Index',
  components: {
    NavBar,
    Popup
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()

    let searchFlag = ref(false)
    let state = reactive({
      showGoTop: false,
      showMenu: false,
      bottom: null
    })

    onMounted(() => {
      state.bottom = document.getElementById('bottom')
      state.bottom.addEventListener('scroll', proxy.$debounce(scrollFunc, 300))
      state.showMenu = true
    })

    let scrollFunc = () => {
      var scrollTop = state.bottom.scrollTop || state.bottom.scrollTop //滚动条距离顶部高度
      scrollTop > 500 ? (state.showGoTop = true) : (state.showGoTop = false)
    }

    let changeSearchFlag = function () {
      searchFlag.value = !searchFlag.value
    }

    let closeSearch = function () {
      searchFlag.value = false
    }

    // 返回顶部
    const goTop = () => {
      state.bottom.scrollTop = 0
    }
    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    mitt.on('openSearch', () => {
      changeSearchFlag()
    })

    mitt.on("scrollTo", (top) => {
      state.bottom.scrollTop = top
    })

    return {
      searchFlag,
      changeSearchFlag,
      closeSearch,
      ...toRefs(state),
      goTop,
      goBack
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  min-height: 600px;
  min-width: 990px;
  .top {
    height: 60px;
    width: 100%;
  }
  // .left,

  .left {
    padding-right: 20px;
  }

  .bottom {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    & > div {
      width: 100%;
      max-width: 1200px;
    }
  }
}
.menu_item {
  height: 36px;
  width: 36px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: 0.5s;
}
.menu_item:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.gotop-enter-active,
.gotop-leave-active {
  transition: all 1s ease;
}
.gotop-enter-to,
.gotop-leave-from {
  transform: translateX(0px);
  opacity: 1;
}
.gotop-enter-from,
.gotop-leave-to {
  transform: translateX(60px);
  opacity: 0;
}

// @media screen and(max-width:800px) {
//   .left {
//     width: 0;
//   }
//   .right {
//     width: 100%;
//   }
// }
// @media screen and (min-width: 800px) {

// }
</style>
