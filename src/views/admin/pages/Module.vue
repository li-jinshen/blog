<template>
  <div class="module">
    <div class="top flex justify-start pb-4">
      <el-input v-model="moduleName" placeholder="请输入模块名" clearable style="width:300px;" />
      <div class="mx-2"></div>
      <el-button type="primary" round>添加模块</el-button>
    </div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="User">
          <ModuleItem type="user"></ModuleItem>
        </el-tab-pane>
        <el-tab-pane label="Config">
          <ModuleItem type="config"></ModuleItem>
        </el-tab-pane>
        <el-tab-pane label="Role">
          <ModuleItem type="role"></ModuleItem>
        </el-tab-pane>
        <el-tab-pane label="Task">
          <ModuleItem type="task"></ModuleItem>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ModuleItem from '../components/ModuleItem.vue'
import { ref } from 'vue'
export default {
  name: 'App',
  components: {
    ModuleItem
  },
  setup() {
    return {
      moduleName: ref('')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
