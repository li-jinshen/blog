<template>
  <div class="container h-full px-4">
    <div class="flex items-center justify-around w-full pt-4">
      <div class="px-2 sort item_box">
        <div class="font-bold text-left">点击排行</div>
        <div
          class="flex items-center py-2 duration-500 item"
          v-for="(item,index) in getHotRecommended"
          :key="index"
          @click="goPage(item)"
        >
          <span
            class="justify-center sort_num iconfont icon-toptenbands_icon_king jin"
            v-if="index == 0"
          ></span>
          <span
            class="justify-center sort_num iconfont icon-toptenbands_icon_king yin"
            v-else-if="index == 1"
          ></span>
          <span
            class="justify-center sort_num iconfont icon-toptenbands_icon_king tong"
            v-else-if="index == 2"
          ></span>
          <span class="justify-center text-gray-600 sort_num" v-else>
            {{
              index
            }}
          </span>
          <span class="text-left text-gray-600 content">{{ item.title }}</span>
          <span class="items-center pl-2 text-gray-500 click">
            <i class="pr-1 iconfont icon-liulanliang1"></i>
            <span style="font-size: 14px">{{ item.views }}</span>
          </span>
        </div>
      </div>
      <div class="px-2 date item_box">
        <div class="font-bold text-left">最新动态</div>
        <div
          class="flex items-center py-2 duration-500 item"
          v-for="(item,index) in getRecentNews"
          :key="item"
          @click="goPage(item)"
        >
          <span class="justify-center sort_num iconfont icon-zuixin2" v-if="index <= 2"></span>
          <span class="justify-center text-gray-600 sort_num" v-else>
            {{
              index
            }}
          </span>
          <span class="text-left text-gray-600 content">{{ item.title }}</span>
          <span class="flex items-center pl-2 text-gray-500 click">
            <i class="pr-1 iconfont icon-riqi1" style="font-size: 14px"></i>
            <span style="font-size: 14px">{{ transformDate(item.date, 'simple') }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center py-3">
      <div class="flex items-center justify-center text-gray-600 rounded btn">
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
import { useStore, mapGetters } from 'vuex'

export default {
  name: 'Article',
  computed: {
    ...mapGetters(['getHotRecommended', 'getRecentNews'])
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const transformDate = proxy.$transformDate

    const router = useRouter()

    onMounted(() => {
      store.dispatch('getRank')
      store.dispatch('getSingleArticle')
    })

    // 跳转到文章详情页面
    const goPage = (item) => {
      localStorage.removeItem("listInfo")
      router.push({ path: '/blog/index/article', query: { id: item._id } })
    }

    return {
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
