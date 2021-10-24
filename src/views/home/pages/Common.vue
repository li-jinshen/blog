<template>
  <div class="container">
    <div class="top flex flex-wrap mt-4" v-if="style == 'square'">
      <div
        class="square flex justify-center items-center mb-6"
        v-for="item in list"
        :key="item.picture"
      >
        <div>
          <a :href="item.link" target="_blank">
            <!-- <div class="square_icon rounded-lg">
              <img :src="item.icon" alt />
            </div>-->
            <ImageItem :url="item.picture" :width="110" :height="110" :scale="true"></ImageItem>
            <div class="square_text mt-2 text-gray-500">{{ item.name }}</div>
          </a>
        </div>
      </div>
    </div>
    <div class="top flex flex-wrap mt-4 w-full" v-else>
      <div
        v-for="item in list"
        :key="item.picture"
        style="width:50%"
        class="flex justify-center items-center"
      >
        <div
          class="rectangle p-2 flex items-center mb-6 rounded-lg duration-700"
          @click="openAddress(item.link)"
        >
          <div class="rectangle_left rounded-lg">
            <!-- <img :src="item.icon" alt /> -->
            <ImageItem :url="item.picture" :width="90" :height="90"></ImageItem>
          </div>
          <div class="rectangle_right">
            <p class="rectangle_title text-gray-600 text-xl text-left">{{item.name}}</p>
            <p class="rectangle_msg text-gray-500 text-base text-left mt-2">{{item.describe}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'Resources',
  setup() {
    const route = useRoute()
    const { proxy } = getCurrentInstance()
    onBeforeRouteUpdate((to) => {
      console.log('to', to.query)
      getData(to.query.id)
    })

    onMounted(() => {
      console.log('创建了e')
      console.log(route.query)
      getData(route.query.id)
    })

    let state = reactive({
      list: [],
      style: ''
    })

    // 获取列表
    const getData = (id) => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getModelList,
          params: {
            id
          }
        })
        .then((res) => {
          console.log('列表', res)
          if (res.status == 1) {
            state.list = []
            res.data.modelList.sort(proxy.$sortRule)
            state.list.push(...res.data.modelList)
            state.style = res.data.style
          }
        })
        .catch((error) => {
          console.log('获取模块错误', error)
        })
    }

    // 页面跳转
    function openAddress(link) {
      link == '' ? '' : window.open(link)
    }

    return {
      ...toRefs(state),
      openAddress
    }
  }
}
</script>
  
  <style lang="scss" scoped>
// .top::after {
//   content: '';
//   width: 25%;
// }
</style>
  