<template>
  <div class="container">
    <v-md-editor v-model="text" height="400px" :include-level="[1,2,3,4]"></v-md-editor>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  setup() {
    return
  }
}
</script>

<style lang="scss" scoped>
</style>
