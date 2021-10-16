<template>
  <div class="archive rounded" style="overflow:hidden">
    <div
      style="display:inline-block;user-select:none"
      class="left_box rounded relative z-10 h-full"
    >
      <div
        v-for="(item,index) in menu"
        :key="item._id"
        class="py-2 w-full duration-500 cursor-pointer text-left px-3 hover:bg-primary hover:text-white"
        :class="tabIndex == index ? 'bg-primary text-white':''"
        @click="changeTab(item,index)"
      >{{item.name}}</div>
    </div>
    <div style="display:inline-block" class="right_box h-full rounded pt-4">
      <div
        class="item_box flex justify-center items-center w-full pb-4 px-8"
        v-for="item in state.articleList"
        :key="item._id"
      >
        <div class="item w-full rounded py-4">
          <div class="title text-xl font-bold text-left px-6">{{item.title}}</div>
          <div class="category flex items-center px-6 my-2 text-sm">
            <div
              class="category_item rounded text-white"
              v-for="(categoryItem,categoryIndex) in item.category"
              :key="categoryIndex"
            >{{categoryItem}}</div>
          </div>
          <div
            style="user-select: none;"
            class="info bg-gray-200 rounded py-2 mb-2 flex mx-4 px-2 justify-between items-center text-gray-500 text-sm"
          >
            <div>浏览量：{{item.views}}</div>
            <div>点赞数：{{item.like}}</div>
            <div>发布日期：{{item.time}}</div>
          </div>
          <div
            class="detail text-right text-sm text-gray-500 px-6 cursor-pointer hover:text-primary duration-500"
          >
            <span @click="viewsDetail(item)">查看详情</span>
            <span class="iconfont icon-xiangqing" style="font-size:12px"></span>
          </div>
        </div>
      </div>
      <div class="my-2 px-8" v-if="state.maxPage > 1 && state.page!=state.maxPage">
        <div class="loadmore py-2 rounded text-gray-500 cursor-pointer" @click="loadMore">点击查看更多</div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
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
      limit: 10 //每页的数量
    })

    // tabIndex改变
    const changeTab = (item, index) => {
      tabIndex.value = index
      state.page = 1
      categoryArticle(item.name)
    }

    onMounted(() => {
      getCategory()
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
          console.log('获取分类', res)
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
          console.log('根据分类获取文章', res)
          if (res.status == 1) {
            res.data.forEach((item) => {
              item.time = proxy.$transformDate(item.date)
            })
            if (state.page == 1) {
              state.articleList = []
            }

            state.count = res.count
            state.maxPage = Math.ceil(state.count / state.limit)
            console.log(state.count, state.limit, state.maxPage)

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
      loadMore
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
    