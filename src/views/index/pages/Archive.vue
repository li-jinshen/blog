<template>
  <div class="archive rounded" style="overflow:hidden">
    <div
      style="display:inline-block;user-select:none"
      class="left_box rounded relative z-10 h-full"
    >
      <div
        v-for="(item,index) in menu"
        :key="index"
        class="py-2 w-full duration-500 cursor-pointer hover:bg-primary hover:text-white"
        :class="tabIndex == index ? 'bg-primary text-white':''"
        @click="changeTab(item,index)"
      >{{item.name}}</div>
    </div>
    <div style="display:inline-block" class="right_box h-full rounded pt-4">
      <div
        class="item_box flex justify-center items-center w-full pb-4 px-8"
        v-for="item in 10"
        :key="'item'+item"
      >
        <div class="item w-full rounded py-4">
          <div class="title text-xl font-bold text-left px-6">微信小程序蓝牙对接打印机</div>
          <div class="category flex items-center px-6 my-2 text-sm">
            <div class="category_item rounded text-white">vue</div>
            <div class="category_item rounded text-white">React</div>
            <div class="category_item rounded text-white">webpack</div>
          </div>
          <div
            style="user-select: none;"
            class="info bg-gray-200 rounded py-2 mb-2 flex mx-4 px-2 justify-between items-center text-gray-500 text-sm"
          >
            <div>浏览量：100</div>
            <div>点赞数：100</div>
            <div>发布日期：2012-12-12</div>
          </div>
          <div
            class="detail text-right text-sm text-gray-500 px-6 cursor-pointer hover:text-primary duration-500"
          >
            <span>查看详情</span>
            <span class="iconfont icon-xiangqing" style="font-size:12px"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive, ref } from 'vue'
export default {
  name: 'Article',
  setup(props) {
    let tabIndex = ref(0)
    const menu = reactive([
      { name: '全部' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: '全部' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: '全部' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' },
      { name: 'vue' },
      { name: 'react' }
    ])

    // tabIndex改变
    const changeTab = (item, index) => {
      tabIndex.value = index
    }

    return {
      menu,
      tabIndex,
      changeTab
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
  }
}
</style>
    