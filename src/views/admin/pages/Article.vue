<template>
  <div class>
    <div class="top flex justify-start pb-4">
      <el-input v-model="keyword" placeholder="请输入关键词搜索" clearable style="width:300px;" />
      <div class="mx-2"></div>
      <el-button type="primary">搜索</el-button>
    </div>
    <div>
      <el-table :data="tableData" :border="true">
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
        <el-table-column prop="date" label="发表时间"></el-table-column>
        <el-table-column prop="views" label="浏览量"></el-table-column>
        <el-table-column prop="praise" label="点赞量"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt-4">
      <el-pagination
        :hide-on-single-page="false"
        v-model:currentPage="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    const item = {
      sort: 1,
      title: 'vue3',
      date: '2016-05-02',
      category: 'vue',
      views: 200,
      praise: 123
    }
    const tableData = ref(Array(10).fill(item))

    // 分页先关
    let currentPage = ref(1)
    function handleSizeChange(pageSize) {
      console.log('数量改变', pageSize)
    }
    function handleCurrentChange(page) {
      console.log('页码改变', page)
    }
    return {
      keyword: ref(''),
      tableData,
      currentPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
