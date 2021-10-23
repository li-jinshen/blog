<template>
  <div class="h-full common">
    <div class="flex items-center justify-between w-full h-full">
      <div
        class="relative flex justify-end h-full px-2 duration-500 left"
        ref="leftBox"
        style="overflow:hidden"
      >
        <div
          class="fixed duration-1000 rounded left_box"
          :style="{ left: offsetLeft + 'px', top: '69px', width: boxWidth + 'px', opacity: opacity }"
        >
          <div class="text-left recommend">
            <div class="flex items-center font-bold item_title">
              <div
                class="flex items-center justify-center w-1/2 py-3 duration-500 cursor-pointer"
                :class="tab == 'hot' ? 'bg-primary text-white' : ''"
                @click="changeTab('hot')"
              >热门推荐</div>
              <div
                class="flex items-center justify-center w-1/2 py-3 duration-500 cursor-pointer"
                :class="tab == 'recent' ? 'bg-primary text-white' : ''"
                @click="changeTab('recent')"
              >最新动态</div>
            </div>
            <ul class="px-4">
              <li
                class="text-base duration-300 cursor-pointer li_item hover:text-primary"
                v-for="(item,index) in (tab == 'hot' ? getHotRecommended : getRecentNews)"
                :key="item._id"
                style="padding:7px 0px;"
                @click="goArtitle(item)"
              >{{ index + 1 }}、{{ item.title }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h-full pl-2 duration-500 right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mapGetters, useStore } from 'vuex'
import mitt from '../../../common/EventBus'
import { useRouter } from "vue-router"
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getHotRecommended', 'getRecentNews'])
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    let leftBox = ref(null)
    let offsetLeft = ref(0)
    let boxWidth = ref(0)
    let tab = ref('hot')
    let opacity = ref(0)

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

      setTimeout(() => {
        opacity.value = 1
      }, 200)
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

    // 跳转到文章详情页面
    const goArtitle = (item) => {
      router.push({ path: '/blog/index/article', query: { id: item._id } })
    }

    return {
      leftBox,
      offsetLeft,
      boxWidth,
      changeTab,
      tab,
      goArtitle,
      opacity
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
  // border-bottom: 0.0625rem solid var(--borderLightColor);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.right {
  width: 73%;
  height: 100%;
}
</style>
