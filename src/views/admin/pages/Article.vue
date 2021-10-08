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
        :page-sizes="[20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
export default {
  name: 'App',
  setup() {
    const { proxy } = getCurrentInstance()

    const item = {
      sort: 1,
      title: 'vue3',
      date: '2016-05-02',
      category: 'vue',
      views: 200,
      praise: 123
    }
    const tableData = ref(Array(10).fill(item))

    // 分页相关
    let currentPage = ref(1)
    let total = ref(0)
    let limit = ref(1)
    function handleSizeChange(pageSize) {
      console.log('数量改变', pageSize)
      limit.value = pageSize
    }
    function handleCurrentChange(page) {
      console.log('页码改变', page)
      currentPage.value = page
    }

    onMounted(() => {
      getSingleArticle()
    })

    // 获取最近更新
    const getSingleArticle = () => {
      proxy
        .$request({
          method: 'get',
          url:
            proxy.$requestPath.getSingleArticle +
            `?limit=${limit.value}&page=${currentPage.value}&sort=0`
        })
        .then((res) => {
          console.log('获取的文章', res)
          // let { data } = res
          // state.article = data
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }

    return {
      keyword: ref(''),
      tableData,
      currentPage,
      limit,
      total,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
