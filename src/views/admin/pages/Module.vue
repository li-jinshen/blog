<template>
  <div class="module">
    <div class="top flex justify-start pb-4">
      <!-- <el-input v-model="name" placeholder="请输入模块名" clearable style="width:200px;" />
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
      <div class="mx-2"></div>-->
      <el-button type="primary" round @click="showPopup('add')">添加模块</el-button>
      <el-button type="warning" round @click="showPopup('modify')">修改模块</el-button>
      <el-button type="danger" round @click="showPopup('delete')">删除模块</el-button>
    </div>
    <div>
      <el-tabs type="card" @tab-click="changeTab" v-model="tabActive">
        <el-tab-pane :label="item.name" v-for="item in tab" :key="item._id"></el-tab-pane>
      </el-tabs>
      <ModuleItem :id="id" ref="moduleRef" v-if="tab.length>0"></ModuleItem>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="type == 'add'?'添加模块':type == 'modify'?'修改模块':'删除模块'"
      width="500px"
    >
      <el-form v-if="type == 'add' || type == 'modify'">
        <el-form-item label="选择模块" :label-width="formLabelWidth" v-if="type == 'modify'">
          <el-select v-model="ModifyModel" placeholder="请选择要修改的模块" style="width:100%">
            <el-option
              v-for="item in tab"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off" placeholder="请输入模块名称"></el-input>
        </el-form-item>

        <el-form-item label="图标类名" :label-width="formLabelWidth">
          <el-input v-model="icon" autocomplete="off" placeholder="请输入图标类名"></el-input>
        </el-form-item>
        <el-form-item label="模块样式" :label-width="formLabelWidth">
          <el-select v-model="style" placeholder="请选择模块样式" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else>
        <el-form-item label="选择模块" :label-width="formLabelWidth">
          <el-select v-model="deleteModel" placeholder="请选择要删除的模块" style="width:100%">
            <el-option
              v-for="item in tab"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="type=='add'?addModel():updateModel()">确定</el-button>
        </span>
      </template>
    </el-dialog>
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
  nextTick,
  watch
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
      sort: '',
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
      tabActive: '',
      id: '',
      type: 'add',
      dialogFormVisible: false,
      formLabelWidth: 80,
      deleteModel: '',
      ModifyModel: ''
    })

    watch(
      () => state.ModifyModel,
      (newValue) => {
        if (newValue != '') {
          let index = state.tab.findIndex((item) => {
            return item._id == newValue
          })
          let model = state.tab[index]
          state.icon = model.icon
          state.style = model.style
          state.sort = model.sort
          state.name = model.name
        }
      }
    )

    onMounted(() => {
      getModel()
    })

    // 添加模块
    const addModel = () => {
      if (proxy.$isNull(state.name)) {
        ElMessage.error('模块名称不能为空')
        return
      }
      if (proxy.$isNull(state.icon)) {
        ElMessage.error('模块类名不能为空')
        return
      }
      if (proxy.$isNull(state.style)) {
        ElMessage.error('模块样式不能为空')
        return
      }
      if (proxy.$isNull(state.sort)) {
        ElMessage.error('模块序号不能为空')
        return
      }
      // 添加模块
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.addModel,
          data: {
            name: state.name,
            icon: state.icon,
            style: state.style,
            sort: state.sort
          }
        })
        .then((res) => {
          if (res.status == 1) {
            ElMessage.success('模块添加成功')
            reset()
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
          if (res.status == 1) {
            state.tab = []
            res.data.forEach((item) => {
              item.value = item._id
              item.label = item.name
            })
            res.data.sort(proxy.$sortRule)
            state.tab.push(...res.data)
            res.data.length > 0 ? (state.id = res.data[0]._id) : ''

            nextTick(() => {
              res.data.length > 0
                ? moduleRef.value.getData(res.data[0]._id)
                : ''
            })
          }
        })
        .catch((error) => {
          console.log('获取模块错误', error)
        })
    }

    // 模块操作（删除|修改）
    const updateModel = () => {
      let data = {}
      if (state.type == 'delete') {
        if (proxy.$isNull(state.deleteModel)) {
          ElMessage.error('请选择要删除的模块')
          return
        }
        data = {
          type: 'delete',
          _id: state.deleteModel
        }
      } else {
        if (proxy.$isNull(state.ModifyModel)) {
          ElMessage.error('请选择要修改的模块')
          return
        }
        if (proxy.$isNull(state.name)) {
          ElMessage.error('模块名称不能为空')
          return
        }
        if (proxy.$isNull(state.icon)) {
          ElMessage.error('模块类名不能为空')
          return
        }
        if (proxy.$isNull(state.style)) {
          ElMessage.error('模块样式不能为空')
          return
        }
        if (proxy.$isNull(state.sort)) {
          ElMessage.error('模块序号不能为空')
          return
        }
        data = {
          type: 'modify',
          _id: state.ModifyModel,
          name: state.name,
          icon: state.icon,
          style: state.style,
          sort: state.sort
        }
      }
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.updateModel,
          data
        })
        .then((res) => {
          if (res.status == 1) {
            ElMessage.success(res.msg)
            reset()
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((error) => {
          console.log('更新模块错误', error)
        })
    }

    // 点击tabs
    const changeTab = (e) => {
      let name = e.props.label
      let tabItem = state.tab.find((item) => {
        return name == item.name
      })
      state.id = tabItem._id
      moduleRef.value.getData(tabItem._id)
    }

    // 弹窗显示
    const showPopup = (type) => {
      state.type = type
      state.dialogFormVisible = true
    }

    // 重置
    const reset = () => {
      state.name = ''
      state.icon = ''
      state.style = ''
      state.sort = ''
      state.ModifyModel = ''
      state.deleteModel = ''
      state.dialogFormVisible = false
      state.tabActive = '0'
      getModel()
    }

    return {
      addModel,
      ...toRefs(state),
      changeTab,
      moduleRef,
      showPopup,
      updateModel
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
