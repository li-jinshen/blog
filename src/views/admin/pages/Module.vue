<template>
  <div class="module">
    <div class="top flex justify-start pb-4">
      <el-input v-model="name" placeholder="请输入模块名" clearable style="width:200px;" />
      <div class="mx-2"></div>
      <el-input v-model="icon" placeholder="请输入图标类名" clearable style="width:200px;" />
      <div class="mx-2"></div>
      <el-select v-model="style" placeholder="模块样式" style="width:200px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="mx-2"></div>
      <el-button type="primary" round @click="addModel">添加模块</el-button>
    </div>
    <div>
      <el-tabs type="card" @tab-click="changeTab">
        <el-tab-pane :label="item.name" v-for="item in tab" :key="item._id"></el-tab-pane>
      </el-tabs>
      <ModuleItem :id="id" ref="moduleRef" v-if="tab.length>0"></ModuleItem>
    </div>
  </div>
</template>

<script>
import ModuleItem from '../components/ModuleItem.vue'
import {
  getCurrentInstance,
  reactive,
  toRefs,
  onMounted,
  ref,
  nextTick
} from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'App',
  components: {
    ModuleItem
  },
  setup() {
    const { proxy } = getCurrentInstance()
    let moduleRef = ref(null)
    let state = reactive({
      name: '',
      icon: '',
      menu: [],
      list: [],
      style: '',
      options: [
        {
          value: 'square',
          label: 'square'
        },
        {
          value: 'rectangle',
          label: 'rectangle'
        }
      ],
      tab: [],
      id: ''
    })

    onMounted(() => {
      getModel()
    })

    // 添加模块
    const addModel = () => {
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.addModel,
          data: {
            name: state.name,
            icon: state.icon,
            style: state.style
          }
        })
        .then((res) => {
          console.log('添加模块', res)
          if (res.status == 1) {
            ElMessage.success('模块添加成功')
            state.name = ''
            state.icon = ''
            state.style = ''
          }
        })
        .catch((error) => {
          console.log('添加模块错误', error)
        })
    }

    // 获取模块
    const getModel = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getModel
        })
        .then((res) => {
          console.log('获取模块', res)
          if (res.status == 1) {
            state.tab = []
            state.tab.push(...res.data)
            res.data.length > 0 ? (state.id = res.data[0]._id) : ''

            nextTick(() => {
              res.data.length > 0 ? moduleRef.value.getData() : ''
            })
            console.log(state.id)
          }
        })
        .catch((error) => {
          console.log('获取模块错误', error)
        })
    }

    // 点击tabs
    const changeTab = (e) => {
      let name = e.props.label
      let tabItem = state.tab.find((item) => {
        return name == item.name
      })
      state.id = tabItem._id
      moduleRef.value.getData()
      console.log(moduleRef.value)
    }

    return {
      addModel,
      ...toRefs(state),
      changeTab,
      moduleRef
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
