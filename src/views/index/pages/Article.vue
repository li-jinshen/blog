<template>
  <div class="article">
    <v-md-editor v-model="markdown" mode="preview"></v-md-editor>
    <!-- <v-md-preview :text="markdown"></v-md-preview> -->
    <!-- <v-md-preview-html :html="markdown" preview-class="vuepress-markdown-body"></v-md-preview-html> -->
  </div>
</template>
    
<script>
import { ref } from 'vue'
export default {
  name: 'Article',

  setup(props) {
    let markdown = ref('')

    markdown.value = JSON.parse(localStorage.getItem('markdownContent'))
    return { markdown }
  }
}
</script>
    
<style lang="scss" scoped>
</style>
    