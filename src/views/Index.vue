<template>
  <div class="index w-full h-full" id="indexbox">
    <!-- <Loading></Loading> -->
    <NavBar></NavBar>
    <!-- 占位元素 -->
    <div class="top"></div>
    <div class="bottom flex justify-center pt-2" id="bottom">
      <div>
        <router-view></router-view>
      </div>
    </div>

    <!-- 搜索组件 -->
    <Popup :isShow="searchFlag" @close="closeSearch"></Popup>
  </div>
</template>

<script>
import NavBar from './index/components/Navbar.vue'
import Popup from '../components/popup/Popup.vue'
import mitt from '../common/EventBus'
import { ref } from 'vue'

export default {
  name: 'Index',
  components: {
    NavBar,
    Popup
  },
  setup() {
    let searchFlag = ref(false)

    let changeSearchFlag = function () {
      searchFlag.value = !searchFlag.value
    }

    let closeSearch = function () {
      console.log('关闭弹窗')
      searchFlag.value = false
    }

    mitt.on('openSearch', () => {
      changeSearchFlag()
    })

    return {
      searchFlag,
      changeSearchFlag,
      closeSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  min-height: 600px;
  min-width: 990px;
  .top {
    height: 60px;
    width: 100%;
  }
  // .left,

  .left {
    padding-right: 20px;
  }

  .bottom {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    & > div {
      width: 100%;
      max-width: 1200px;
    }
  }
}
// @media screen and(max-width:800px) {
//   .left {
//     width: 0;
//   }
//   .right {
//     width: 100%;
//   }
// }
// @media screen and (min-width: 800px) {

// }
</style>
