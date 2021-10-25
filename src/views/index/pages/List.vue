<template>
  <div class="container w-full h-full px-2" id="cotainer">
    <div class="flex items-center justify-center pb-4">
      <div class="relative rounded-full tab_box" style="width:150px;height:35px">
        <div
          class="absolute duration-500 rounded-full bg bg-primary"
          style="height:35px;width:75px"
          :style="{ left: left + 'px' }"
        ></div>
        <div
          class="relative z-50 flex items-center justify-between h-full cursor-pointer"
          style="user-select:none"
        >
          <div
            class="flex items-center justify-center w-1/2 h-full text-sm font-bold text-gray-500"
            @click="tabChange(1)"
          >时间</div>
          <div
            class="flex items-center justify-center w-1/2 h-full text-sm font-bold text-gray-500"
            @click="tabChange(2)"
          >浏览</div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full" v-if="article.length > 0" :style="{ opacity: opacity }">
      <div
        class="w-1/2 article_box"
        style="height:480px;overflow:hidden"
        v-for="item in article"
        :key="item._id"
      >
        <div class="relative rounded list_item" style="width:95%; height:95%;padding:0">
          <div
            class="absolute z-10 flex items-center justify-center text-xl text-white duration-500 rounded mask text-bold"
            @click="goArtitle(item)"
          >
            <div>
              <span>查看详情</span>
              <span class="iconfont icon-xiangqing" style="font-size:15px"></span>
            </div>
          </div>
          <div
            class="flex items-center justify-center w-full bg-gray-700 rounded img_box"
            style="height:55%;overflow:hidden"
          >
            <!-- <img src="../../../assets/svg/load_error.svg" alt style="width:250px;height:auto" /> -->
            <!--              onerror="../../../assets/svg/load_error.svg"  -->
            <!-- <img
              src
              style="object-fit:cover;max-width:none"
              alt
              data-origin="https://z3.ax1x.com/2021/09/07/h5LrrQ.png"
            />-->
            <!-- <ArticleImageItem url="https://z3.ax1x.com/2021/10/24/5faNh8.jpg" :scale="true"></ArticleImageItem> -->
            <ArticleImageItem :url="item.background" :scale="true"></ArticleImageItem>
          </div>
          <div class="px-4 text-left info_box">
            <div class="py-2 text-xl font-bold title">{{ item.title }}</div>
            <div class="flex items-center mb-2 text-sm category">
              <div
                class="text-white rounded category_item"
                v-for="category in item.category"
                :key="category"
              >{{ category }}</div>
            </div>
            <div
              class="px-4 py-2 my-2 text-sm text-gray-500 bg-gray-100 rounded desc"
            >{{ item.Intro }}</div>
          </div>
          <div class="flex items-center px-4 text-sm text-gray-500">
            <div class="w-1/2 text-left">
              <span class="pr-1 iconfont icon-liulanliang1"></span>
              <span>{{ item.views }}</span>
            </div>
            <!-- <div style="width:33.33%;" class="text-center">
              <span class="pr-1 iconfont icon-dianzan"></span>
              <span>100</span>
            </div>-->
            <div class="w-1/2 text-right">
              <span class="pr-1 iconfont icon-riqi1"></span>
              <span>{{ transformDate(item.date, "simple") }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="half-width fade-in bg-primary" /> -->
      <!-- <div class="half-width fade-in bg-primary" /> -->
      <!-- <div class="fade-in full-width bg-primary" />
      <div class="fade-in full-width bg-primary" />-->
    </div>
    <!-- <div class="flex items-center justify-center w-full py-4 page_box">
      <div class="flex items-center page">
        <div class="px-2 text-sm font-bold text-gray-500 info page_item">共5页 当前页：4</div>
        <div class="mx-2 text-sm font-bold text-gray-500 prev page_item"></div>
        <div class="mr-2 text-sm font-bold text-gray-500 next page_item"></div>
        <div class="text-sm font-bold text-gray-500 go page_item">
          <div style="width: 50px;" class="iuput_box">
            <input type="number" />
          </div>
          <div class>GO</div>
        </div>
      </div>
    </div>-->
    <div class="flex items-center justify-center pt-2 pb-4">
      <Pagination
        @change-page="changePage"
        :pagesize="limit"
        :total="total"
        :page="page"
        ref="pagination"
      ></Pagination>
    </div>
  </div>
</template>
    
<script>
import { onMounted, reactive, getCurrentInstance, toRefs, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import ArticleImageItem from "@/components/ImageItem/ArticleImageItem.vue"
import Pagination from "@/components/pagination/Pagination.vue"
import mitt from '../../../common/EventBus'
export default {
  name: 'Article',
  components: {
    ArticleImageItem,
    Pagination
  },
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()

    let pagination = ref()

    let state = reactive({
      page: 1,
      maxPage: 1,
      sort: 1,
      limit: 10,
      total: 0,
      article: [],
      transformDate: proxy.$transformDate,
      opacity: 0,
      left: 0,
      top: 0,
      listInfo: null
    })

    // 控制页码的变化
    const changePage = (page) => {
      // 修改分页参数，重新调用接口即可
      state.page = page
      localStorage.removeItem("listInfo")
      state.listInfo = null
      state.top = 0
      getSingleArticle()
    }


    onMounted(() => {
      state.listInfo = localStorage.getItem("listInfo") ? JSON.parse(localStorage.getItem("listInfo")) : ""
      if (state.listInfo != "") {
        state.page = parseInt(state.listInfo.page)
        state.top = state.listInfo.top
      }
      getSingleArticle()
    })

    // 跳转到文章详情页面
    const goArtitle = (item) => {
      let top = document.getElementById('bottom').scrollTop
      localStorage.setItem("listInfo", JSON.stringify({
        page: state.page,
        top
      }))
      router.push({ path: '/blog/index/article', query: { id: item._id } })
    }

    // 分页获取文章
    const getSingleArticle = () => {
      proxy
        .$request({
          method: 'get',
          url:
            proxy.$requestPath.getSingleArticle +
            `?limit=${state.limit}&page=${state.page}&sort=${state.sort}`
        })
        .then((res) => {
          state.opacity = 1
          let { count, data } = res
          data.forEach((item, index) => {
            item.sort = index + 1
            item.time = proxy.$transformDate(item.date, 'simple')
          })
          state.article = []
          state.article = data
          state.total = count

          nextTick(() => {
            observer()
            mitt.emit('scrollTo', state.top)
            // state.listInfo ? state.page = parseInt(state.listInfo.page) : ""
            state.listInfo ? pagination.value.inputPage(parseInt(state.listInfo.page)) : ""
          })
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }

    const observer = () => {
      let list = document.querySelectorAll('.article_box')
      let observer = new IntersectionObserver((entries) => {
        // console.log(entries)
        entries.forEach((element) => {
          if (element.isIntersecting) {
            element.target.classList.add('show') // 增加show类名
            observer.unobserve(element.target) // 移除监听
          }
        })
      })
      list.forEach((item) => observer.observe(item))
    }

    const tabChange = (index) => {
      state.sort = index
      state.left = (index - 1) * 75
      getSingleArticle()
    }

    return { goArtitle, ...toRefs(state), changePage, tabChange, pagination }
  }
}
</script>
    
<style lang="scss" scoped>
.container {
  width: 100%;
  // min-width: 450px;
}

.fade-in {
  height: 500px;
  margin-bottom: 50px;
  opacity: 1;
  transition: 0.3s all ease-out;
  transform: scale(0.8);
  box-sizing: border-box;
  padding: 20px;
  display: inline-block;
}
.full-width {
  width: 100%;
}

.half-width {
  width: 47.5%;
}

.half-width:nth-of-type(2n + 1) {
  margin-right: 2.5%;
}

.half-width:nth-of-type(2n) {
  margin-left: 2.5%;
}
.list_item {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  // border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
  padding: 0 !important;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    height: 90px;
  }
}
.mask {
  opacity: 0;
  background: rgba(0, 0, 0, 0);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.mask:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
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
.show {
  animation: scale_animate 1s ease;
}
@keyframes scale_animate {
  from {
    opacity: 0;
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
.img_box {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}
.page_box {
  .page_item {
    height: 36px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(16.5px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .prev,
  .next {
    width: 36px;
  }
  .iuput_box {
    width: 100%;
    height: 100%;
  }
}
.tab_box {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
}
</style>
    