
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
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @select="changeMenu"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item :index="index+''" v-for="(item,index) in menu" :key="index">
          <i :class="item.icon" class="mr-2 text-xl"></i>
          <template #title>
            <span style="display:inline-block;margin-top:2px">{{item.name}}</span>
          </template>
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
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
        <div class="w-full h-full" style="overflow-y:scroll">
          <div class="bg-white w-full conent_box p-6 rounded">
            <router-view></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    // 菜单
    const menu = [
      {
        icon: 'iconfont icon-yonghu',
        name: '信息管理',
        path: '/blog/admin/management/archives'
      },
      {
        icon: 'iconfont icon-gongjukuguanli',
        name: '模块管理',
        path: '/blog/admin/management/module'
      },
      {
        icon: 'iconfont icon-liuyan',
        name: '文章管理',
        path: '/blog/admin/management/article'
      },
      {
        icon: 'iconfont icon-gonggao2',
        name: '公告管理',
        path: '/blog/admin/management/announcement'
      },
      {
        icon: 'iconfont icon-liuyan2',
        name: '留言管理',
        path: '/blog/admin/management/message'
      },
      {
        icon: 'iconfont icon-liuyan3',
        name: '评论管理',
        path: '/blog/admin/management/comment'
      },
      {
        icon: 'iconfont icon-fangwenliang',
        name: '浏览管理',
        path: '/blog/admin/management/browse'
      }
    ]

    // 菜单默认值
    let defaultActive = ref('1')

    onMounted(() => {
      let index = menu.findIndex((item) => {
        return item.path === route.fullPath
      })
      defaultActive.value = index + ''
    })

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
      isCollapse.value = flag
    }

    const goPage = (path) => {
      router.push({ path })
    }

    const changeMenu = (index) => {
      goPage(menu[index].path)
    }

    return {
      tableData,
      isCollapse,
      handleOpen,
      handleClose,
      changeCollapse,
      goPage,
      menu,
      changeMenu,
      defaultActive
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
.conent_box {
  min-height: 100%;
}
</style>
