<template>
  <div class="index w-full h-full">
    <!-- <Loading></Loading> -->
    <NavBar></NavBar>
    <!-- 占位元素 -->
    <div class="top"></div>
    <div class="bottom flex justify-center items-center pt-2" id="bottom">
      <div class="flex justify-between items-center w-full h-full">
        <div class="left h-full flex justify-end duration-500 px-2 relative" ref="leftBox">
          <div
            class="left_box fixed"
            :style="{left:offsetLeft +'px',top:'70px',width:boxWidth +'px'}"
          >{{boxWidth}}</div>
        </div>
        <div class="right h-full duration-500 pl-2">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <!-- 搜索组件 -->

    <Popup :isShow="searchFlag" @close="closeSearch"></Popup>
  </div>
</template>

<script>
import NavBar from './index/components/Navbar.vue'
import Popup from '../components/popup/Popup.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import mitt from '../common/EventBus'
export default {
  name: 'Index',
  components: {
    NavBar,
    Popup
  },
  setup() {
    let searchFlag = ref(false)
    let leftBox = ref(null)
    let offsetLeft = ref(0)
    let boxWidth = ref(0)

    onMounted(() => {
      console.dir(leftBox.value.offsetLeft)
      changeSize()

      // 底部滚动条滚动时，通知articleList页面
      document
        .getElementById('bottom')
        .addEventListener('scroll', debounce(emitFunc, 15))

      window.addEventListener('resize', changeSize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', changeSize)
    })

    let debounce = (fn, wait) => {
      var timer = null
      return function () {
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      }
    }

    let emitFunc = () => {
      // console.log('执行')
      mitt.emit('onScroll')
    }

    let changeSize = () => {
      offsetLeft.value = leftBox.value.offsetLeft
      boxWidth.value = leftBox.value.clientWidth
    }

    mitt.on('openSearch', () => {
      changeSearchFlag()
    })

    let changeSearchFlag = function () {
      searchFlag.value = !searchFlag.value
    }

    let closeSearch = function () {
      console.log('关闭弹窗')
      searchFlag.value = false
    }

    return {
      searchFlag,
      changeSearchFlag,
      closeSearch,
      leftBox,
      offsetLeft,
      boxWidth
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
  // .right {
  //   background: rgba(255, 255, 255, 0.4);
  //   box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  //   backdrop-filter: blur(13.5px);
  //   -webkit-backdrop-filter: blur(16.5px);
  //   border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  // }
  .left {
    padding-right: 20px;
  }
  .left_box {
    width: 350px;
    height: 500px;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(16.5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  }
  .left {
    width: 30%;
  }
  .right {
    width: 70%;
    height: 100%;
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
