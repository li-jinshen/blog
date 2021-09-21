
<template>
  <el-container style="height: 100vh;">
    <el-aside style="background-color: #545c64;width:auto !important;">
      <div class="cursor-pointer flex justify-center items-center" style="height:60px">
        <i
          class="el-icon-s-unfold text-white text-2xl"
          v-if="isCollapse"
          @click="changeCollapse(false)"
        ></i>
        <i class="el-icon-s-fold text-white text-2xl" v-else @click="changeCollapse(true)"></i>
      </div>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="flex items-center justify-end">
        <div>
          <el-button type="primary" icon="el-icon-edit" circle @click="goPage('/blog/markdown')"></el-button>
          <el-button type="danger" icon="el-icon-switch-button" circle @click="goPage('/')"></el-button>
        </div>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const item = {
      date: '2016-05-02',
      name: '王小',
      address: '上海市普陀区金沙江路 1518 弄'
    }

    const tableData = ref(Array(20).fill(item))

    const isCollapse = ref(true)
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const changeCollapse = (flag) => {
      console.log(flag)
      isCollapse.value = flag
      console.log(isCollapse.value)
    }

    const goPage = (path) => {
      router.push({ path })
    }

    return {
      tableData,
      isCollapse,
      handleOpen,
      handleClose,
      changeCollapse,
      goPage
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
