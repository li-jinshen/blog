<template>
  <div class="common h-full">
    <div class="flex justify-between items-center w-full h-full">
      <div
        class="left h-full flex justify-end duration-500 px-2 relative"
        ref="leftBox"
        style="overflow:hidden"
      >
        <div
          class="left_box fixed rounded"
          :style="{left:offsetLeft +'px',top:'69px',width:boxWidth +'px'}"
        >
          <div class="recommend text-left">
            <div class="item_title font-bold flex items-center">
              <div
                class="w-1/2 flex justify-center items-center py-3 duration-500 cursor-pointer"
                :class="tab == 'hot'?'bg-primary text-white':''"
                @click="changeTab('hot')"
              >热门推荐</div>
              <div
                class="w-1/2 flex justify-center items-center py-3 duration-500 cursor-pointer"
                :class="tab == 'recent'?'bg-primary text-white':''"
                @click="changeTab('recent')"
              >最新动态</div>
            </div>
            <ul class="px-4">
              <li
                class="li_item cursor-pointer hover:text-primary duration-300"
                v-for="(item,index) in (tab == 'hot'?getHotRecommended :getRecentNews)"
                :key="item._id"
                style="padding:7px 0px;"
              >{{index+1}}、{{item.title}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right h-full duration-500 pl-2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mapGetters, useStore } from 'vuex'
import mitt from '../../../common/EventBus'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getHotRecommended', 'getRecentNews'])
  },
  setup() {
    const store = useStore()

    let leftBox = ref(null)
    let offsetLeft = ref(0)
    let boxWidth = ref(0)
    let tab = ref('hot')

    onMounted(() => {
      console.dir(leftBox.value.offsetLeft)
      changeSize()

      // 底部滚动条滚动时，通知articleList页面
      document
        .getElementById('bottom')
        .addEventListener('scroll', debounce(emitFunc, 15))

      window.addEventListener('resize', changeSize)

      store.dispatch('getRank')
      store.dispatch('getSingleArticle')
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', changeSize)
    })

    let changeSize = () => {
      offsetLeft.value = leftBox.value.offsetLeft
      boxWidth.value = leftBox.value.clientWidth
    }
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

    // 切换tab
    const changeTab = (type) => {
      tab.value = type
    }

    return {
      leftBox,
      offsetLeft,
      boxWidth,
      changeTab,
      tab
    }
  }
}
</script>

<style lang="scss" scoped>
.left_box {
  // width: 300px;
  // height: 500px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}
.item_title {
  background: rgba(255, 255, 255, 0.7);
}
.left {
  width: 27%;
}
.li_item {
  border-bottom: 0.0625rem solid var(--borderLightColor);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.right {
  width: 73%;
  height: 100%;
}
</style>
