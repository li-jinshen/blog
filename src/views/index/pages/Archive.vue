<template>
  <transition name="tablist">
    <div class="rounded archive" style="overflow:hidden" v-if="showArchive">
      <div
        style="display:inline-block;user-select:none"
        class="relative z-10 h-full rounded left_box"
      >
        <div
          v-for="(item,index) in menu"
          :key="item._id"
          class="w-full px-3 py-3 text-left duration-500 cursor-pointer hover:bg-primary hover:text-white"
          :class="tabIndex == index ? 'bg-primary text-white' : ''"
          @click="changeTab(item, index)"
        >{{ item.name }}</div>
      </div>
      <div style="display:inline-block" class="h-full pt-4 rounded right_box">
        <div
          class="flex items-center justify-center w-full px-8 pb-4 item_box"
          v-for="item in state.articleList"
          :key="item._id"
        >
          <div class="w-full py-4 rounded item">
            <div class="px-6 text-xl font-bold text-left title">{{ item.title }}</div>
            <div class="flex items-center px-6 my-2 text-sm category">
              <div
                class="text-white rounded category_item"
                v-for="(categoryItem,categoryIndex) in item.category"
                :key="categoryIndex"
              >{{ categoryItem }}</div>
            </div>
            <div
              style="user-select: none;"
              class="flex items-center justify-between px-2 py-2 mx-4 mb-2 text-sm text-gray-500 bg-gray-200 rounded info"
            >
              <div class="w-1/2 text-left">浏览量：{{ item.views }}</div>
              <div class="w-1/2 text-left">发布日期：{{ item.time }}</div>
            </div>
            <div
              class="px-6 text-sm text-right text-gray-500 duration-500 cursor-pointer detail hover:text-primary"
            >
              <span @click="viewsDetail(item)">查看详情</span>
              <span class="iconfont icon-xiangqing" style="font-size:12px"></span>
            </div>
          </div>
        </div>
        <div class="px-8 my-2" v-if="state.maxPage > 1 && state.page != state.maxPage">
          <div class="py-2 text-gray-500 rounded cursor-pointer loadmore" @click="loadMore">点击查看更多</div>
        </div>
      </div>
    </div>
  </transition>
</template>
    
<script>
import { reactive, ref, getCurrentInstance, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Article',
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()

    let tabIndex = ref(0)
    let menu = reactive([])
    let state = reactive({
      articleList: [], // 分类文章
      count: 0, // 分类文章总数
      page: 1, // 当前页
      maxPage: 1, // 最大页码数
      limit: 10, //每页的数量
      showArchive: false
    })

    // tabIndex改变
    const changeTab = (item, index) => {
      tabIndex.value = index
      state.page = 1
      categoryArticle(item.name)
    }

    onMounted(() => {
      getCategory()
      state.showArchive = true
    })

    // 获取分类
    const getCategory = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getCategory
        })
        .then((res) => {
          if (res.status == 1) {
            menu.push(...res.data)
            if (menu.length > 0) {
              state.page = 1
              categoryArticle(menu[0].name)
            }
          }
          // console.log('获取分类', res)
        })
        .catch((error) => {
          console.log('获取分类', error)
        })
    }
    // 根据分类获取文章
    const categoryArticle = (category) => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.categoryArticle,
          params: {
            limit: state.limit,
            page: state.page,
            category
          }
        })
        .then((res) => {
          // console.log('根据分类获取文章', res)
          if (res.status == 1) {
            res.data.forEach((item) => {
              item.time = proxy.$transformDate(item.date, 'simple')
            })
            if (state.page == 1) {
              state.articleList = []
            }

            state.count = res.count
            state.maxPage = Math.ceil(state.count / state.limit)

            state.articleList.push(...res.data)
          }
        })
        .catch((error) => {
          console.log('根据分类获取文章', error)
        })
    }

    const viewsDetail = (item) => {
      router.push({ path: '/blog/index/article', query: { id: item._id } })
    }

    const loadMore = () => {
      state.page = state.page + 1
      categoryArticle(menu[tabIndex.value].name)
    }

    return {
      menu,
      tabIndex,
      changeTab,
      state,
      viewsDetail,
      loadMore,
      ...toRefs(state)
    }
  }
}
</script>
    
<style lang="scss" scoped>
.archive {
  height: calc(100% - 0.625rem);
  & > div {
    overflow-y: scroll;
  }
  & > div::-webkit-scrollbar {
    width: 0;
  }
  .left_box {
    width: 7.5rem;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(16.5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .right_box {
    width: calc(100% - 7.5rem);
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(16.5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    .item_box {
      .item {
        background: rgba(255, 255, 255, 0.6);
        box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(13.5px);
        -webkit-backdrop-filter: blur(16.5px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        .category {
          user-select: none;
          .category_item {
            padding: 0.125rem 0.5rem;
            background: olive;
          }
          .category_item:not(:last-child) {
            margin-right: 0.625rem;
          }
        }
      }
    }
    .loadmore {
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(13.5px);
      -webkit-backdrop-filter: blur(16.5px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    }
  }
}
</style>
    