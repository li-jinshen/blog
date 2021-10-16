<template>
  <div class>
    <div style="height:60px" class="bg-white px-8 py-2">
      <div>
        <div class="flex items-center justify-end w-full">
          <div>
            <el-button type="primary" @click="showDrawer">基本信息</el-button>
            <el-button type="primary" @click="publishArticle">发布</el-button>
            <el-button @click="close">关闭</el-button>
          </div>
        </div>
      </div>
    </div>
    <v-md-editor
      v-model="content"
      height="calc(100vh - 60px)"
      align="left"
      :left-toolbar="toolbar"
      :include-level="[1,2,3,4]"
    ></v-md-editor>
    <el-drawer v-model="drawer" :with-header="false">
      <div class="p-2 w-full">
        <div class="w-full">
          <div class="font-bold text-base mb-1">标题：</div>
          <div>
            <el-input v-model="title" placeholder="请输入标题" clearable style="width:100%;" />
          </div>
        </div>
        <div class="mt-6">
          <div class="font-bold text-base mb-1">标签：</div>
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
        <div class="my-6">
          <div class="font-bold text-base mb-1">主图：</div>
          <el-input v-model="background" placeholder="请输入展示图地址" clearable style="width:100%;" />
        </div>
        <div class="w-full">
          <div class="font-bold text-base mb-1">简介：</div>
          <el-input
            type="textarea"
            v-model="desc"
            placeholder="请输入文章简介"
            clearable
            style="width:100%;"
            :autosize="{ minRows: 6, maxRows: 12 }"
          />
        </div>
        <div class="mt-6 px-4">
          <el-button type="primary" @click="showDrawer" style="width:100%">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { reactive, ref, nextTick, getCurrentInstance, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { proxy } = getCurrentInstance()
    let content = ref('')
    let toolbar =
      'undo redo clear | tip | emoji | h bold italic strikethrough quote | ul ol table hr | link image code | save'

    let inputVisible = ref(false)
    let dynamicTags = reactive([]) // 分类标签
    let inputValue = ref('')
    let input = ref(null)

    // 文章对象
    let articleObj = reactive({
      title: '',
      category: [],
      value: '',
      content: '',
      Intro: '',
      date: null,
      views: 0,
      background: '',
      like: 0
    })

    // 标题，背景图，简介
    let title = ref('')
    let background = ref('')
    let desc = ref('')

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

    onMounted(() => {
      if (route.query.id) {
        getArticleDetail()
      }
    })
    // 获取文章详情
    const getArticleDetail = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getArticleDetail + `?id=${route.query.id}`
        })
        .then((res) => {
          console.log(res)
          let { data } = res
          let article = data[0]
          articleObj = article
          content.value = article.value
          title.value = article.title
          dynamicTags.push(...article.category)
          background.value = article.background
          desc.value = article.Intro
          console.log('articleObj', articleObj)
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }
    // 发布文章 | 更新文章
    const publishArticle = () => {
      let data = {
        Intro: desc.value,
        background: background.value,
        category: dynamicTags,
        title: title.value,
        value: content.value
      }
      if (route.query.id) {
        data._id = articleObj._id
        data.date = articleObj.date
        data.like = articleObj.like
        data.views = articleObj.views
      }
      let msg = ''
      route.query.id ? (msg = '文章更新') : (msg = '文章发布')
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.publishArticle,
          data
        })
        .then((res) => {
          console.log(res)
          if (res.status == 1) {
            ElMessage.success(msg + '成功')
          } else {
            ElMessage.error(msg + '失败')
          }
        })
        .catch((error) => {
          ElMessage.error(msg + '错误')
        })
    }

    // 抽屉相关
    let drawer = ref(false)

    const showDrawer = () => {
      drawer.value = !drawer.value
    }

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
      drawer,
      showDrawer,
      publishArticle
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
