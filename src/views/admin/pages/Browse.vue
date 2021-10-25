<template>
  <div class>
    <div class="flex justify-end py-3 font-bold text-base">总访问量：{{count}}</div>
    <el-tabs type="border-card">
      <el-tab-pane label="浏览量分布">
        <el-table :data="addressList" :border="true">
          <el-table-column prop="address" label="地区"></el-table-column>
          <el-table-column prop="count" label="访问量"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="近三十天">
        <el-table :data="dateRecords" :border="true">
          <el-table-column prop="day" label="日期"></el-table-column>
          <el-table-column prop="number" label="访问量"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="详情">
        <el-table :data="recordList" :border="true">
          <el-table-column prop="sort" label="序号"></el-table-column>
          <el-table-column prop="ip" label="ip地址"></el-table-column>
          <el-table-column prop="address" label="区域"></el-table-column>
          <el-table-column prop="time" label="访问时间"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- <div class="mt-4">
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
    </div>-->
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'App',
  setup() {
    const { proxy } = getCurrentInstance()

    let state = reactive({
      count: 0,
      addressList: [],
      dateRecords: [],
      recordList: []
    })

    onMounted(() => {
      getVisitorsRecrd()
    })

    const getVisitorsRecrd = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getVisitorsRecordDetail
        })
        .then((res) => {
          let { address, count, views, records } = res
          state.addressList = []
          state.dateRecords = []
          state.recordList = []
          state.count = count
          state.dateRecords = views
          let list = []
          Object.getOwnPropertyNames(address).forEach(function (attr) {
            list.push({ address: attr, count: address[attr] })
          })
          state.addressList = list.sort(sortRule)
          let recordList = records.reverse()
          recordList.forEach((item, index) => {
            item.sort = index + 1
            item.time = proxy.$transformDate(item.date, 'full')
          })
          state.recordList = recordList
        })
        .catch((error) => {
          console.log('登录错误', error)
        })
    }

    // 排序规则
    const sortRule = (a, b) => {
      return b.count - a.count
    }

    const item = {
      sort: 1,
      date: '2016-05-02',
      ip: '192.168.0.0',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    const tableData = ref(Array(10).fill(item))

    // 分页相关
    let currentPage = ref(1)
    function handleSizeChange(pageSize) {}
    function handleCurrentChange(page) {}

    return {
      tableData,
      type: ref(''),
      currentPage,
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
