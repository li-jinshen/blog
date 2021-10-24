<template>
  <div class="container w-full h-full">
    <div class="content_box w-full">
      <div class="header w-full flex justify-center items-center">
        <Search />
      </div>
      <div class="router_view_box">
        <div class="h-full w-full router_view_inner">
          <!-- <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>-->
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer class="flex justify-center items-center">
      <div class="flex justify-center items-center">
        <span class="text-sm text-gray-500">版本：v2.0.0</span>
        <span class="text-sm text-gray-500 ml-8">总访问量：{{ count }}</span>
        <span class="text-sm text-gray-500 ml-8">粤ICP备19141395号</span>
        <a
          class="ml-8 flex items-center"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44162402000025"
          target="_blank"
        >
          <img src="@/assets/images/gongan.png" alt />
          <span class="ml-1 text-sm text-gray-500">粤公网安备44162402000025号</span>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  ref,
  watch,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from 'vue'
import Search from '@/components/search/Search.vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    const { proxy } = getCurrentInstance()
    let state = reactive({
      count: 0
    })

    let animatoin = ref('')
    watch(
      () => store.getters.getHomeFlag,
      (newVal) => {
        newVal
          ? (animatoin.value = 'slide-left')
          : (animatoin.value = 'slide-right')
        console.log('animation', animatoin.value)
      }
    )

    onMounted(() => {
      getVisitorsRecord()
    })

    const getVisitorsRecord = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getVisitorsRecord
        })
        .then((res) => {
          console.log('获取访客记录', res)
          state.count = res.count
          // if (res.status == 1) {
          //   ElMessage.success(res.msg)
          //   let userToken = {
          //     token: res.token,
          //     ...res.user
          //   }
          //   localStorage.setItem('userToken', JSON.stringify(userToken))
          //   store.commit('updateLoginStatus', true) // 更新登录状态
          //   setTimeout(() => {
          //     reset()
          //     router.push({ path: '/blog/admin' })
          //   }, 1000)
          // } else {
          //   ElMessage.error(res.msg)
          // }
        })
        .catch((error) => {
          console.log('登录错误', error)
        })
    }

    return {
      animatoin,
      ...toRefs(state)
    }
  },
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
.container {
  user-select: none;
}
.header {
  height: 60px;
  border-bottom: 1px solid rgb(235, 235, 235);
}
.content_box {
  height: calc(100% - 40px);
  overflow-y: hidden;
  padding: 0px 10px;
}
.router_view_box {
  height: calc(100% - 60px);
  overflow: hidden;
  .router_view_inner {
    overflow-y: scroll;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
footer {
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 1s;
  position: absolute;
  opacity: 1;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
  transition-delay: 0.5s;
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
  transition-delay: 0.5s;
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

// .fade-enter-active {
//   transition-delay: 0.5s;
// }

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
