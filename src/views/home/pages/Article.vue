<template>
  <div class="container px-4 h-full">
    <div class="flex items-center pt-4 justify-around w-full">
      <div class="sort item_box px-2">
        <div class="font-bold text-left">点击排行</div>
        <div
          class="item duration-500 flex items-center py-2"
          v-for="(item,index) in state.rankList"
          :key="index"
          @click="goPage(item)"
        >
          <span
            class="sort_num iconfont icon-toptenbands_icon_king jin justify-center"
            v-if="index == 0"
          ></span>
          <span
            class="sort_num iconfont icon-toptenbands_icon_king yin justify-center"
            v-else-if="index == 1"
          ></span>
          <span
            class="sort_num iconfont icon-toptenbands_icon_king tong justify-center"
            v-else-if="index == 2"
          ></span>
          <span class="sort_num text-gray-600 justify-center" v-else>
            {{
            index
            }}
          </span>
          <span class="content text-gray-600 text-left">{{item.title}}</span>
          <span class="click text-gray-500 pl-2 items-center">
            <i class="iconfont icon-liulanliang1 pr-1"></i>
            <span style="font-size: 14px">{{item.views}}</span>
          </span>
        </div>
      </div>
      <div class="date item_box px-2">
        <div class="font-bold text-left">最近更新</div>
        <div
          class="item duration-500 flex items-center py-2"
          v-for="(item,index) in state.article"
          :key="item"
          @click="goPage(item)"
        >
          <span class="sort_num iconfont icon-zuixin2 justify-center" v-if="index <=2"></span>
          <span class="sort_num text-gray-600 justify-center" v-else>
            {{
            index
            }}
          </span>
          <span class="content text-gray-600 text-left">{{item.title}}</span>
          <span class="click text-gray-500 pl-2 flex items-center">
            <i class="iconfont icon-riqi1 pr-1" style="fontsize: 14px"></i>
            <span style="font-size: 14px">{{transformDate(item.date)}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center py-3">
      <div class="btn text-gray-600 rounded flex items-center justify-center">
        <router-link to="/blog/index">
          <span>进入博客模块</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Article',
  setup() {
    const { proxy } = getCurrentInstance()
    const transformDate = proxy.$transformDate

    const router = useRouter()

    let state = reactive({
      rankList: [],
      article: []
    })
    // 获取点击排行数据
    const getRank = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getRank + '?limit=10'
        })
        .then((res) => {
          let { data } = res
          state.rankList = data
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }
    // 获取最近更新
    const getSingleArticle = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getSingleArticle + '?limit=10&page=1&sort=1'
        })
        .then((res) => {
          let { data } = res
          state.article = data
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }

    onMounted(() => {
      getRank()
      getSingleArticle()
    })

    // 跳转到文章详情页面
    const goPage = (item) => {
      router.push({ path: '/blog/index/article', query: { id: item._id } })
    }

    return {
      state,
      transformDate,
      goPage
    }
  }
}
</script>

<style lang="scss" scoped>
.item_box {
  // background: rgba(255, 255, 255, 0.1);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  // backdrop-filter: blur(4px);
  // -webkit-backdrop-filter: blur(4px);
  // border-radius: 10px;
  // border: 1px solid rgba(255, 255, 255, 0.18);
  width: 50%;
  .item:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
  span {
    display: flex;
    font-size: 15px;
  }
  .sort_num {
    width: 40px;
  }
  .content {
    width: 200px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.jin {
  color: #ebc059;
}
.yin {
  color: #e1e4ea;
}
.tong {
  color: rgb(184, 115, 51);
}
.iconfont {
  font-size: 24px !important;
}
.icon-zuixin2 {
  color: red;
}
.icon-liulanliang1 {
  font-size: 15px !important;
}
.icon-riqi1 {
  font-size: 15px !important;
}
.btn {
  height: 40px;
  width: 150px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  position: relative;
  transition: 0.5s;
}
.btn:hover {
  cursor: pointer;
  background: var(--primary);
  color: white;
}
</style>
