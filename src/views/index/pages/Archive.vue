<template>
  <div class="archive rounded" style="overflow:hidden">
    <div style="display:inline-block" class="left_box rounded relative z-10 h-full">
      <div
        v-for="(item,index) in menu"
        :key="index"
        class="py-2 w-full duration-500 cursor-pointer hover:bg-primary hover:text-white"
        :class="tabIndex == index ? 'bg-primary text-white':''"
        @click="changeTab(item,index)"
      >{{item.name}}</div>
    </div>
    <div style="display:inline-block" class="right_box h-full rounded"></div>
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
  }
}
</style>
    