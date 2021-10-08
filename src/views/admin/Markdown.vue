<template>
  <div class>
    <div style="height:120px" class="bg-white px-8 py-2">
      <div>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <el-input v-model="title" placeholder="请输入标题" clearable style="width:300px;" />
            <div class="ml-4">
              <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                class="mr-2"
              >{{ tag }}</el-tag>
              <el-input
                v-if="inputVisible"
                ref="input"
                v-model="inputValue"
                class="input-new-tag"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="submit">发布</el-button>
            <el-button @click="close">关闭</el-button>
          </div>
        </div>
      </div>
      <div class="pt-2">
        <el-input v-model="background" placeholder="请输入展示图地址" clearable style="width:300px;" />
        <el-input
          type="textarea"
          v-model="desc"
          placeholder="请输入文章简介"
          clearable
          class="ml-4"
          style="width:50%;"
        />
      </div>
    </div>
    <v-md-editor
      v-model="content"
      height="calc(100vh - 120px)"
      align="left"
      :left-toolbar="toolbar"
      :include-level="[1,2,3,4]"
    ></v-md-editor>
  </div>
</template>

<script>
import { reactive, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()
    let content = ref('')
    let toolbar =
      'undo redo clear | tip | emoji | h bold italic strikethrough quote | ul ol table hr | link image code | save'

    let inputVisible = ref(false)
    let dynamicTags = reactive([])
    let inputValue = ref('')
    let input = ref(null)

    const handleClose = (tag) => {
      dynamicTags.splice(dynamicTags.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        input.value.focus()
      })
    }

    const handleInputConfirm = () => {
      let value = inputValue.value
      if (value) {
        dynamicTags.length == 3 ? dynamicTags.splice(0, 1) : ''
        dynamicTags.push(value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }

    // 关闭
    const close = () => {
      router.push({ path: '/blog/admin/management/article' })
    }

    // 发布文章
    const submit = () => {
      console.log('文章内容', content.value)
      localStorage.setItem('markdownContent', JSON.stringify(content.value))
    }

    // 标题，背景图，简介
    let title = ref('')
    let background = ref('')
    let desc = ref('')

    return {
      title,
      background,
      desc,
      toolbar,
      dynamicTags,
      inputVisible,
      inputValue,
      input,
      handleClose,
      showInput,
      handleInputConfirm,
      editType: ref('edit'),
      content,
      close,
      submit
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 40px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
