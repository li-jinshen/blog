<template>
  <div class="container flex justify-center items-center relative">
    <div class="input_box rounded">
      <input
        type="text"
        placeholder="请输入关键字搜索文章"
        class="w-full h-full text-center text-gray-500"
        v-model="keyword"
      />
    </div>
    <!-- <div class="absolute flex justify-center items-center right-2">
      <router-link to="/blog/index">
        <span class="iconfont icon-boke1 text-primary" style="font-size:26px"></span>
      </router-link>
    </div>-->
    <transition name="search">
      <div class="absolute result_box rounded p-3 z-50" v-show="show">
        <div v-if="state.result.length>0">
          <div
            class="item p-2 w-full flex justify-start"
            v-for="(item,index) in state.result"
            :key="item._id"
            @click="goArtitle(item)"
          >
            <div class="sort duration-500 text-left" style="fontSize:17px">{{index+1}}</div>
            <div class="item_content">
              <p
                class="text-left duration-500 text-gray-600 title"
                style="fontSize:16px"
              >{{item.title}}</p>
              <p class="flex items-center mt-1">
                <span class="text-gray-400 flex items-center w-1/2">
                  <i class="iconfont icon-riqi1 pr-1" style="fontSize:14px"></i>
                  {{transformDate(item.date,'simple')}}
                </span>
                <span class="text-gray-400 flex items-center w-1/2">
                  <i class="iconfont icon-liulanliang1 pr-1"></i>
                  {{item.views}}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center h-full" v-else>
          <div>
            <!-- <img src="../../assets/images/svg/null-food.svg" style="width:150px" alt /> -->
            <img src="https://z3.ax1x.com/2021/10/24/5faa9S.png" style="width:150px" alt />

            <p class="text-gray-500 text-sm mt-2">暂无数据</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
  
  <script>
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Search',
  setup() {
    const { proxy } = getCurrentInstance()
    const transformDate = proxy.$transformDate
    const router = useRouter()

    let show = ref(false)
    let keyword = ref('')
    let state = reactive({
      result: []
    })

    watch(keyword, (newVal) => {
      if (newVal !== '') {
        show.value = true
        searchKeyword()
      } else {
        show.value = false
      }
    })

    const searchKeyword = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.search + `?keyword=${keyword.value}`
        })
        .then((res) => {
          let { data } = res
          state.result = data
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }

    const goArtitle = (item) => {
      router.push({ path: '/blog/index/article', query: { id: item._id } })
    }

    return {
      keyword,
      show,
      transformDate,
      state,
      goArtitle
    }
  }
}
</script>
  
  <style lang="scss" scoped>
.container {
  height: 60px;
  position: relative;
  width: 100%;
}
.input_box {
  width: 300px;
  height: 36px;
  background: rgba(255, 255, 255, 0.25);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  // border-bottom: 1px solid #e0e0e0;
  input {
    font-size: 15px;
  }
}
.result_box {
  position: absolute;
  height: 280px;
  width: 400px;
  background: rgba(250, 250, 250, 0.9);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  top: 60px;
  overflow-y: scroll;
  .item {
    transition: 0.5s;
    .sort {
      width: 40px;
      height: 100%;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item_content {
      width: calc(100% - 40px);
    }
    p {
      span {
        font-size: 14px;
      }
    }
  }
  & .item:not(:last-child) {
    border-bottom: 1px solid var(--borderLightColor);
  }
  .item:hover {
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid transparent;
  }
  .item:hover .sort {
    color: var(--primary);
    font-size: 26px !important;
  }
  .item:hover .title {
    color: var(--primary);
  }
}

.search-enter-active,
.search-leave-active {
  transition: all 0.6s ease;
}
.search-enter-to,
.search-leave-from {
  opacity: 1;
}
.search-enter-from,
.search-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
  