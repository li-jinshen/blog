<template>
  <div class="container h-full w-full px-2" id="cotainer">
    <div class="w-full flex flex-wrap">
      <div class="w-1/2" style="height:480px;oveflow:hidden" v-for="item in 10" :key="item">
        <div class="list_item rounded relative" style="width:95%; height:95%">
          <div
            class="mask absolute rounded z-10 text-white flex justify-center items-center text-xl text-bold duration-500"
            @click="goArtitle"
          >
            <div>
              <span>查看详情</span>
              <span class="iconfont icon-xiangqing" style="font-size:15px"></span>
            </div>
          </div>
          <div
            class="img_box w-full bg-primary rounded flex justify-center items-center"
            style="height:55%;overflow:hidden"
          >
            <!-- <img src="../../../assets/svg/load_error.svg" alt style="width:250px;height:auto" /> -->
            <img src="../../../assets/images/photo.jpg" style="object-fit:cover;max-width:none" alt />
          </div>
          <div class="info_box text-left px-4">
            <div class="title py-2 font-bold text-xl">微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机</div>
            <div class="category flex items-center mb-2 text-sm">
              <div class="category_item rounded text-white">vue</div>
              <div class="category_item rounded text-white">React</div>
              <div class="category_item rounded text-white">webpack</div>
            </div>
            <div
              class="desc py-2 text-sm text-gray-500 bg-gray-100 px-4 rounded"
            >微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机微信微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机小程序对接蓝牙打印机微信小程序对接蓝牙打印机微信小程序对接蓝牙打印机</div>
          </div>
          <div class="flex items-center text-gray-500 px-4 text-sm py-2">
            <div style="width:33.33%;" class="text-left">
              <span class="iconfont icon-liulanliang1 pr-1"></span>
              <span>100</span>
            </div>
            <div style="width:33.33%;" class="text-center">
              <span class="iconfont icon-dianzan pr-1"></span>
              <span>100</span>
            </div>
            <div style="width:33.33%;" class="text-right">
              <span class="iconfont icon-riqi1 pr-1"></span>
              <span>2021-12-12</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="half-width fade-in bg-primary" /> -->
      <!-- <div class="half-width fade-in bg-primary" /> -->
      <!-- <div class="fade-in full-width bg-primary" />
      <div class="fade-in full-width bg-primary" />-->
    </div>
  </div>
</template>
    
<script>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import mitt from '../../../common/EventBus'
export default {
  name: 'Article',
  setup() {
    const router = useRouter()

    var fadeInElements = []

    onMounted(() => {
      fadeInElements = Array.from(document.getElementsByClassName('fade-in'))
      // document
      //   .getElementById('cotainer')
      //   .addEventListener('scroll', handleScroll)
      handleScroll()
    })
    mitt.on('onScroll', () => {
      handleScroll()
    })

    onBeforeUnmount(() => {
      document
        .getElementById('cotainer')
        .removeEventListener('scroll', handleScroll)
    })

    const handleScroll = (evt) => {
      // console.log('我执行了')
      for (var i = 0; i < fadeInElements.length; i++) {
        var elem = fadeInElements[i]
        if (isElemVisible(elem)) {
          elem.style.opacity = '1'
          elem.style.transform = 'scale(1)'
          fadeInElements.splice(i, 1) // 只让它运行一次
        }
      }
    }
    const isElemVisible = (el) => {
      var rect = el.getBoundingClientRect()
      var elemTop = rect.top // 200 = buffer
      var elemBottom = rect.bottom
      return elemTop < window.innerHeight && elemBottom >= 0
    }

    const goArtitle = () => {
      router.push({ path: '/blog/index/article' })
    }

    return { goArtitle }
  }
}
</script>
    
<style lang="scss" scoped>
.container {
  width: 100%;
  // min-width: 450px;
  margin: 0 auto;
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
</style>
    