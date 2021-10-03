<template>
  <div class>
    <div class="top flex justify-start pb-4">
      <el-select v-model="type" placeholder="请选择类型" style="width:200px">
        <el-option label="文本" value="text"></el-option>
        <el-option label="链接" value="link"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" :border="true">
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="ip" label="ip地址"></el-table-column>
      <el-table-column prop="address" label="区域"></el-table-column>
    </el-table>
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
      date: '2016-05-02',
      ip: '192.168.0.0',
      address: '上海市普陀区金沙江路 1518 弄'
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
      tableData,
      type: ref(''),
      currentPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
