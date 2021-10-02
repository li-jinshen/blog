<template>
  <div class="container">
    我是模块子组件--{{type}}
    <div class="flex justify-end">
      <el-button type="primary" round>添加</el-button>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    type: {
      type: String,
      default: '测试'
    }
  },
  setup() {
    return
  }
}
</script>

<style lang="scss" scoped>
</style>
