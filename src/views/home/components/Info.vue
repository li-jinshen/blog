<template>
  <div class="container flex items-center justify-center h-full">
    <div>
      <div class="flex items-center justify-between p-2 top">
        <div class="rounded avatars">
          <!-- <img src="@/assets/images/avatars.png" alt /> -->
          <!-- <img
            :src="getBloggerProfile.photo"
            alt
            style="width: 100%;height: 100%;object-fit: cover;"
          />-->
          <ImageItem :url="getBloggerProfile.photo" :width="90" :height="90" :scale="true"></ImageItem>
        </div>
        <div class="dsc">
          <p class="text-2xl font-bold text-left">{{ getBloggerProfile.userName }}</p>
          <p class="my-2 text-sm text-left">前端工程师</p>
          <p class="text-sm text-left">90后</p>
        </div>
      </div>
      <div class="relative z-50 other">
        <div class="flex items-center justify-start text-left text-gray-500">
          <span class="iconfont icon-24gf-tags3"></span>
          <span class="pl-2">我在观察人间</span>
        </div>
        <div
          class="flex items-center mt-1 text-right text-gray-500 cursor-pointer"
          @click="goDetail"
        >
          <span class="iconfont icon-picixiangqing"></span>
          <span class="pl-2">详情>></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createMessage from '@/components/message/message.js'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getBloggerProfile'])
  },
  setup() {
    const goDetail = () => {
      createMessage({
        type: 'error',
        message: '博主暂无很好的设计，敬请期待'
      })
    }
    return {
      goDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.avatars {
  width: 90px;
  height: 90px;
  overflow: hidden;
  image {
    height: 100%;
    width: 100%;
  }
}
.dsc {
  width: calc(100% - 100px);
}
.other {
  font-size: 13px;
  margin: 10px 10px;
  padding: 2px;
  width: 180px;
}
.msg_box {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; //作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
  -webkit-line-clamp: 2; //显示的行
}
</style>
