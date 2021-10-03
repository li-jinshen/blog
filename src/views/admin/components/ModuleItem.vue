<template>
  <div class>
    <!-- 我是模块子组件--{{type}} -->
    <div class="flex justify-end mb-4">
      <el-button type="primary" round @click="dialogFormVisible = true">添加</el-button>
    </div>
    <div>
      <el-table :data="tableData" :border="true">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <img :src="scope.row.image" alt style="width:100px;" />
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
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片链接" :label-width="formLabelWidth">
          <el-input v-model="form.pictrue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型" style="width:100%">
            <el-option label="文本" value="text"></el-option>
            <el-option label="链接" value="link"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off"></el-input>
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
import { reactive, ref } from 'vue'
export default {
  name: 'App',
  props: {
    type: {
      type: String,
      default: '测试'
    }
  },
  setup() {
    let form = reactive({
      name: '',
      picture: '',
      type: '',
      link: ''
    })
    const item = {
      date: '2016-05-02',
      name: '王小',
      address: '上海市普陀区金沙江路 1518 弄',
      image: 'https://avatars.githubusercontent.com/u/55388793?v=4'
    }

    const tableData = ref(Array(20).fill(item))
    return {
      dialogFormVisible: ref(false),
      formLabelWidth: ref(100),
      form,
      tableData
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
