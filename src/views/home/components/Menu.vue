<template>
  <div class="container h-full">
    <div
      class="flex items-center justify-center w-full duration-500 item hover:text-white"
      v-for="item in list"
      :key="item.name"
      @click="goPage(item)"
    >
      <!-- :class="activePath == item.href ? 'activePath' : ''" -->
      <div class="flex items-center justify-start duration-500 item_left">
        <span
          class="mr-1 text-gray-500 duration-500 iconfont"
          :class="item.icon"
          style="font-size:18px"
        ></span>
        <span class="text-gray-500 duration-500">{{ item.name }}</span>
      </div>
      <div class="flex items-center justify-center duration-500 opacity-0 item_right">
        <span class="text-gray-500 jiantou iconfont icon-youjiantou"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { reactive, ref, getCurrentInstance, onMounted, toRefs } from 'vue'

export default {
  name: 'App',
  setup() {
    const { proxy } = getCurrentInstance()

    let state = reactive({
      list: []
    })

    let menu = reactive([
      {
        name: '博客动态',
        icon: 'icon-blog',
        size: 18,
        href: '/blog/home/article',
        type: 'page'
      },
      {
        name: '浏览器插件',
        icon: 'icon-chajian2',
        size: 16,
        href: '/blog/home/browser',
        type: 'page'
      }
      // {
      //   title: '实用工具',
      //   icon: 'iconfont icon-gongjuxiang',
      //   size: 18,
      //   href: '/blog/home/tool'
      // },
      // {
      //   title: '影音娱乐',
      //   icon: 'iconfont icon-icon-test',
      //   size: 18,
      //   href: '/blog/home/music'
      // },
      // {
      //   title: '学习网站',
      //   icon: 'iconfont icon-_fuzhi',
      //   size: 18,
      //   href: '/blog/home/front'
      // },

      // {
      //   title: '图片素材',
      //   icon: 'iconfont icon-sucai3',
      //   size: 17,
      //   href: '/blog/home/resources'
      // },
      // {
      //   title: '导航网站',
      //   icon: 'iconfont icon-daohang21',
      //   size: 18,
      //   href: '/blog/home/navigation'
      // },
      // {
      //   title: '聚合搜索',
      //   icon: 'iconfont icon-sousuo',
      //   size: 16,
      //   href: '/blog/home/search'
      // }
      // {
      //   title: '友情链接',
      //   icon: 'iconfont icon-youqinglianjie',
      //   size: 18,
      //   href: '/blog/home/link'
      // }
    ])
    const route = useRoute()
    const router = useRouter()
    let activePath = ref(route.path)

    onBeforeRouteUpdate((to) => {
      activePath.value = to.fullPath
    })
    function goPage(item) {
      if (item.type) {
        router.push({ path: item.href })
      } else {
        router.push({ path: '/blog/home/common', query: { id: item._id } })
      }
    }
    onMounted(() => {
      getModel()
    })

    // 获取模块
    const getModel = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getModel
        })
        .then((res) => {
          if (res.status == 1) {
            state.list = []
            res.data.forEach((item) => {
              item.value = item._id
              item.label = item.name
            })
            res.data.sort(proxy.$sortRule)
            state.list.push(...menu, ...res.data)
          }
        })
        .catch((error) => {
          console.log('获取模块错误', error)
        })
    }

    return { menu, goPage, activePath, ...toRefs(state) }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow-y: scroll;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.item {
  // border-left: 4px solid transparent;
  height: 50px;
  line-height: 50px;
  position: relative;
  .item_left {
    width: 60%;
  }
  &:hover {
    // border-left: 4px solid #8394c0;
    cursor: pointer;
    // background: rgb(136, 158, 201);
    // color: rgba(255, 255, 255, 0.6);
    div {
      // color: #8394c0;
      transform: translateX(20px);
    }
    .item_right {
      opacity: 1;
    }
  }
}
// .item::after {
//   position: absolute;
//   bottom: 1px;
//   right: 50%;
//   content: '';
//   height: 2px;
//   width: 0px;
//   transition: 0.5s;
//   // background: #8394c0;
//   background: rgba(107, 114, 128, 0.3);
// }
// .item:hover::after {
//   width: 40%;
// }
// .item::before {
//   position: absolute;
//   bottom: 1px;
//   left: 50%;
//   content: '';
//   height: 2px;
//   width: 0;
//   transition: 0.5s;
//   // background: #8394c0;
//   background: rgba(107, 114, 128, 0.3);
// }
// .item:hover::before {
//   width: 30%;
// }
.activePath {
  background: var(--primary) !important;
  // background: rgba(136,158,201,.4);
  span {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
