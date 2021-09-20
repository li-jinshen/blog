<template>
  <div class>
    <v-md-editor
      v-model="text"
      height="100vh"
      align="left"
      :left-toolbar="toolbar"
      :include-level="[1,2,3,4]"
    ></v-md-editor>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  setup() {
    let toolbar =
      'undo redo clear | tip | emoji | h bold italic strikethrough quote | ul ol table hr | link image code | save'
    return {
      toolbar
    }
  }
}
</script>

<style lang="scss" scoped>
div,
p,
h2,
h3,
h4,
h5,
h6 {
  text-align: left;
}
</style>
