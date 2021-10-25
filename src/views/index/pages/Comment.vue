<template>
  <transition name="index_menu">
    <div class="comment" v-if="showComment">
      <div class="inputbox p-4 rounded">
        <div class="bgcolor rounded p-2 pt-3">
          <textarea
            name
            id="content"
            maxlength="100"
            placeholder="请输入留言"
            style="background:none;width:100%;height:100%;border:none;resize:none"
          ></textarea>
        </div>
        <div class="mt-4 flex items-center">
          <div class="name_box bgcolor p-2" style="width:200px">
            <input type="text" maxlength="6" placeholder="请输入名称" style="font-size:15px" />
          </div>
          <div
            class="ml-4 bg-primary p-2 rounded text-white cursor-pointer"
            style="width:100px"
            @click="release"
          >发布</div>
        </div>
      </div>
    </div>
  </transition>
</template>
    
<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue-demi'
import createMessage from '@/components/message/message.js'
export default {
  name: 'Article',

  setup(props) {
    const { proxy } = getCurrentInstance()
    let state = reactive({
      showComment: false
    })
    onMounted(() => {
      state.showComment = true
    })
    const release = () => {
      createMessage({
        type: 'error',
        message: '留言功能暂未开放，敬请期待'
      })
    }
    return {
      ...toRefs(state),
      release
    }
  }
}
</script>
    
<style lang="scss" scoped>
.inputbox {
  background: rgba(255, 255, 255, 0.7) !important;
  box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}
#content {
  font-size: 15px;
}
#content:focus {
  border: none;
  outline: none;
}
.bgcolor {
  background: rgba(221, 221, 221, 0.6);
}
</style>
    