<template>
  <div class>
    <!-- 我是模块子组件--{{type}} -->
    <div class="flex justify-end mb-4">
      <el-button type="primary" round @click="showPopup('add')">添加</el-button>
    </div>
    <div>
      <el-table :data="list" :border="true">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="sort" label="序号"></el-table-column>
        <el-table-column prop="link" label="链接"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <img :src="scope.row.picture" alt style="width:100px;" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" type="text" @click="operation(scope.row,'modify')">编辑</el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="你确定删除该项吗？"
              @confirm="operation(scope.row,'delete' )"
            >
              <template #reference>
                <el-button size="mini" type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" :title="type == 'add'?'添加模块子项目':'修改模块子项目'" width="500px">
      <el-form>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片链接" :label-width="formLabelWidth">
          <el-input v-model="picture" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="type" placeholder="请选择类型" style="width:100%">
            <el-option label="文本" value="text"></el-option>
            <el-option label="链接" value="link"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="describe" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="link" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateModel(operationType)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'App',
  setup(props) {
    const { proxy } = getCurrentInstance()
    let form = reactive({
      name: '',
      picture: '',
      type: '',
      link: '',
      describe: '',
      sort: '',
      list: [],
      operationType: ''
    })
    let parentId = ref('')
    let dialogFormVisible = ref(false) // 控制弹窗
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小',
    //   address: '上海市普陀区金沙江路 1518 弄',
    //   image: 'https://avatars.githubusercontent.com/u/55388793?v=4'
    // }

    // const tableData = ref(Array(20).fill(item))

    const getData = (id) => {
      parentId.value = id
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getModelList,
          params: {
            id
          }
        })
        .then((res) => {
          if (res.status == 1) {
            res.data.modelList.sort(proxy.$sortRule)
            form.list = []
            form.list.push(...res.data.modelList)
          }
        })
        .catch((error) => {
          console.log('获取模块错误', error)
        })
    }

    const updateModel = (type, row) => {
      let modelItem = {}
      if (type == 'add' || type == 'modify') {
        modelItem = {
          picture: form.picture,
          describe: form.describe,
          link: form.link,
          type: form.type,
          name: form.name,
          sort: form.sort
        }
      } else if (type == 'delete') {
        modelItem = row
      }
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.updateModelList,
          data: {
            id: parentId.value,
            type,
            modelItem
          }
        })
        .then((res) => {
          if (res.status == 1) {
            ElMessage.success(res.msg)
            setTimeout(() => {
              dialogFormVisible.value = false
              form.name = ''
              form.picture = ''
              form.type = ''
              form.link = ''
              form.describe = ''
              form.sort = ''
            }, 1000)
            getData(parentId.value)
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((error) => {
          console.log('更新模块错误', error)
        })
    }

    // 表格操作
    const operation = (row, type) => {
      console.log(row, type)
      if (type == 'delete') {
        form.operationType = 'delete'
        updateModel(form.operationType, row)
      } else {
        form.name = row.name
        form.picture = row.picture
        form.type = row.type
        form.link = row.link
        form.describe = row.describe
        form.sort = row.sort
        showPopup('modify')
      }
    }

    // 打开编辑框
    const showPopup = (type) => {
      dialogFormVisible.value = true
      form.operationType = type
    }

    return {
      dialogFormVisible,
      formLabelWidth: ref(80),
      ...toRefs(form),
      getData,
      updateModel,
      operation,
      showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
