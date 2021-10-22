<template>
  <div class="article pb-3 w-full" id="articleBox" ref="article">
    <transition name="article">
      <div class="content duration-500 relative rounded" v-if="state.showArticle">
        <!-- <Loading></Loading> -->
        <div class="ar_header" style="margin:0 2.5rem;padding-top:2rem;">
          <h1 style="font-size: 2em;" class="font-bold ar_title">{{ state.title }}</h1>
          <div style="margin-top:2.5rem;">
            <div class="category flex items-center mb-6">
              <div
                class="category_item rounded text-white"
                v-for="(item,index) in state.category"
                :key="index"
              >{{ item }}</div>
            </div>
            <div
              style="user-select: none;"
              class="info bg-gray-100 rounded w-full py-4 flex px-4 justify-between items-center text-gray-500 text-sm"
            >
              <div class="w-1/2 text-left">浏览量：{{ state.views }}</div>
              <!-- <div>点赞数：{{state.like}}</div> -->
              <div class="w-1/2 text-left">发布日期：{{ state.time }}</div>
            </div>
          </div>
        </div>
        <v-md-editor v-model="markdown" ref="editor" mode="preview"></v-md-editor>
      </div>
    </transition>
    <div
      class="fixed directory rounded duration-500"
      :style="{ right: offsetRight + 'px', top: '69px', width: boxWidth + 'px', opacity: opacity }"
      ref="directory"
    >
      <div class="directory_title font-bold text-xl py-2 px-4">目录</div>
      <div class="py-2 px-4 li_box">
        <div
          v-for="anchor in articleTitles"
          :style="{ padding: `3px 0 3px ${anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor)"
          :key="anchor.lineIndex"
        >
          <a
            style="cursor: pointer"
            class="hover:text-primary duration-300 text-sm directory_item"
          >{{ anchor.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import {
  ref,
  onMounted,
  reactive,
  onBeforeUnmount,
  getCurrentInstance,
  nextTick
} from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Article',

  setup(props) {
    const { proxy } = getCurrentInstance()
    const route = useRoute()

    console.log(route.query.id)

    let markdown = ref('')
    let editor = ref('null')
    let articleTitles = reactive([])
    let state = reactive({
      title: '',
      category: [],
      views: 0,
      time: '',
      id: '',
      like: 0,
      showArticle: false
    })

    let directory = ref(null)
    let article = ref(null)
    let offsetRight = ref(0)
    let boxWidth = ref(0)
    let opacity = ref(0)

    // markdown.value = JSON.parse(localStorage.getItem('markdownContent'))

    onMounted(() => {
      getArticleDetail()

      changeSize()
      window.addEventListener('resize', changeSize)

      setTimeout(() => {
        opacity.value = 1
      }, 200)



    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', changeSize)
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
          let articleObject = data[0]
          markdown.value = articleObject.value
          state.category = articleObject.category
          state.title = articleObject.title
          state.views = articleObject.views
          state.time = proxy.$transformDate(articleObject.date, 'simple')
          state.like = articleObject.like
          state.showArticle = true
          nextTick(() => {
            createDirectory()
          })
          // state.result = data
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    }

    // 生成目录
    const createDirectory = () => {
      const anchors = editor.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
      const titles = Array.from(anchors).filter(
        (title) => !!title.innerText.trim()
      )
      if (!titles.length) {
        articleTitles = []
        return
      }

      const hTags = Array.from(
        new Set(titles.map((title) => title.tagName))
      ).sort()

      let list = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName)
      }))
      articleTitles.push(...list)
    }

    // 点击目录跳转
    const handleAnchorClick = (anchor) => {
      const { lineIndex } = anchor
      const heading = editor.value.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      )
      const top = heading.offsetTop
      let box = document.getElementById('bottom')
      box.scrollTop = top + 225
    }

    // 页面大小改变时重新计算目录盒子的位置和宽度
    const changeSize = () => {
      offsetRight.value = article.value.offsetLeft
      boxWidth.value = article.value.clientWidth * 0.27
      if (document.body.clientWidth < 1100) {
        boxWidth.value = 0
      }
    }

    return {
      markdown,
      editor,
      handleAnchorClick,
      articleTitles,
      directory,
      offsetRight,
      boxWidth,
      article,
      opacity,
      state
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
.directory_item {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content {
  width: 73%;
  min-height: calc(100vh - 5rem);
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  .ar_header {
    .ar_title {
      border-bottom: 0.0625rem solid var(--borderLightColor);
    }
  }
}
.directory {
  width: 27%;
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;

  .directory_title {
    background: rgba(255, 255, 255, 0.8) !important;
  }
  .li_box {
    max-height: calc(100vh - 7.8125rem);
    overflow-y: scroll;
  }
}
@media screen and (max-width: 1100px) {
  .article {
    display: flex;
    justify-content: center;
  }
  .directory {
    opacity: 0;
  }
  .content {
    width: 95%;
  }
}
a {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.category {
  user-select: none;
  .category_item {
    padding: 0.125rem 0.5rem;
    background: olive;
  }
  .category_item:not(:last-child) {
    margin-right: 0.625rem;
  }
}

.article-enter-active,
.article-leave-active {
  transition: all 0.8s ease;
}
.article-enter-to,
.article-leave-from {
  transform: translateY(0px);
  opacity: 1;
}
.article-enter-from,
.article-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
<style lang="scss">
.article {
  .v-md-editor {
    background: none !important;
  }
  .vuepress-markdown-body {
    background: none !important;
  }
}
</style>