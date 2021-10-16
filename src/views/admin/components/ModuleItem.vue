<template>
  <div class>
    <!-- 我是模块子组件--{{type}} -->
    <div class="flex justify-end mb-4">
      <el-button type="primary" round @click="dialogFormVisible = true">添加</el-button>
    </div>
    <div>
      <el-table :data="list" :border="true">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="link" label="链接"></el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <img :src="scope.row.picture" alt style="width:100px;" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="添加模块子项目" width="500px">
      <el-form>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片链接" :label-width="formLabelWidth">
          <el-input v-model="pictrue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="type" placeholder="请选择类型" style="width:100%">
            <el-option label="文本" value="text"></el-option>
            <el-option label="链接" value="link"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="link" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance, toRefs } from 'vue'
export default {
  name: 'App',
  props: {
    id: String
  },
  setup(props) {
    const { proxy } = getCurrentInstance()
    let form = reactive({
      name: '',
      picture: '',
      type: '',
      link: '',
      list: []
    })
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小',
    //   address: '上海市普陀区金沙江路 1518 弄',
    //   image: 'https://avatars.githubusercontent.com/u/55388793?v=4'
    // }

    // const tableData = ref(Array(20).fill(item))

    const getData = () => {
      console.log('获取方法')
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getModelList,
          params: {
            id: props.id
          }
        })
        .then((res) => {
          console.log('获取模块详情', res)
          if (res.status == 1) {
            form.list = []
            list.push(...res.data.modelList)
          }
        })
        .catch((error) => {
          console.log('获取模块错误', error)
        })
    }

    return {
      dialogFormVisible: ref(false),
      formLabelWidth: ref(100),
      ...toRefs(form),
      getData
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
