<template>
  <div class="container flex items-center justify-center h-full">
    <div>
      <div class="flex items-center justify-between p-2 top">
        <div class="rounded avatars">
          <!-- <img src="@/assets/images/avatars.png" alt /> -->
          <img
            :src="getBloggerProfile.photo"
            alt
            style="width: 100%;height: 100%;object-fit: cover;"
          />
        </div>
        <div class="dsc">
          <p class="text-2xl font-bold text-left">深</p>
          <p class="my-2 text-sm text-left">前端工程师</p>
          <p class="text-sm text-left">90后</p>
        </div>
      </div>
      <div class="relative z-50 flex items-center justify-center other">
        <div class="text-gray-500 msg_box">
          罗曼罗兰说过的 这个世界上只有一种真正的英雄主义，那就是
          认清生活的真相，并且仍然热爱它
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'App',
  computed: {
    ...mapGetters(['getBloggerProfile'])
  },
  setup() {
    return
  }
})
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
