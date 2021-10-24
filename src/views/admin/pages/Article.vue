<template>
  <div class>
    <div class="flex justify-start pb-4 top">
      <el-input v-model="keyword" placeholder="请输入关键词搜索" clearable style="width:300px;" />
      <div class="mx-2"></div>
      <el-button type="primary" @click="searchArticle">搜索</el-button>
      <el-button type="primary" @click="searchAll">全部</el-button>
    </div>
    <div>
      <el-table :data="state.article" :border="true">
        <el-table-column prop="sort" label="排序" width="80"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
        <el-table-column prop="time" label="发表时间"></el-table-column>
        <el-table-column prop="views" label="浏览量"></el-table-column>
        <el-table-column prop="like" label="点赞量"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt-4" v-if="type == 'all'">
      <el-pagination
        :hide-on-single-page="false"
        v-model:currentPage="currentPage"
        :page-sizes="[10, 20, 50, 100]"
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
import { ref, onMounted, getCurrentInstance, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()

    // 分页相关
    let currentPage = ref(1)
    let total = ref(0)
    let limit = ref(10)
    function handleSizeChange(pageSize) {
      limit.value = pageSize
      getSingleArticle()
    }
    function handleCurrentChange(page) {
      currentPage.value = page
      getSingleArticle()
    }

    let keyword = ref('')

    onMounted(() => {
      getSingleArticle()
    })

    // 获取的文章数据
    let state = reactive({
      article: [],
      type: 'all'
    })

    // 分页获取文章
    const getSingleArticle = () => {
      proxy
        .$request({
          method: 'get',
          url:
            proxy.$requestPath.getSingleArticle +
            `?limit=${limit.value}&page=${currentPage.value}&sort=0`
        })
        .then((res) => {
          let { count, data } = res
          data.forEach((item, index) => {
            item.sort = index + 1
            item.time = proxy.$transformDate(item.date, 'simple')
          })
          state.article = []
          state.article = data
          total.value = count
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }

    // 编辑
    const handleEdit = (row) => {
      router.push({ path: '/blog/markdown', query: { id: row._id } })
    }

    // 搜索文章
    const searchArticle = () => {
      state.type = 'search'
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.search + `?keyword=${keyword.value}`
        })
        .then((res) => {
          let { data } = res
          data.forEach((item, index) => {
            item.sort = index + 1
            item.time = proxy.$transformDate(item.date, 'simple')
          })
          state.article = []
          state.article = data
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }
    const searchAll = () => {
      state.type = 'all'
      keyword.value = ''
      getSingleArticle()
    }

    return {
      keyword,
      currentPage,
      limit,
      total,
      handleSizeChange,
      handleCurrentChange,
      state,
      handleEdit,
      searchArticle,
      searchAll,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
