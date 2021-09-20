<template>
  <div
    class="popup fixed flex justify-center items-center"
    v-if="showPopup"
    @touchmove.stop.prevent="moveHandle"
  >
    <div class="mask duration-500" :class="conetentFlag ? 'show_mask':''" @click="closePopup"></div>
    <div
      class="popup_content duration-500 relative"
      :class="conetentFlag ? 'show_conent':'hidden_content'"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
export default {
  name: 'App',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    let showPopup = ref(false) // 控组组件的显示隐藏
    let conetentFlag = ref(false) // 控制mask的变量

    showPopup.value = props.isShow

    // 关闭弹窗
    let closePopup = function () {
      context.emit('close')
    }

    watch(
      () => {
        props.isShow
      },
      () => {
        if (props.isShow) {
          console.log('先打开再执行动画')
          showPopup.value = props.isShow
          setTimeout(() => {
            conetentFlag.value = props.isShow
          }, 100)
        } else {
          console.log('先执行动画再关闭')
          conetentFlag.value = props.isShow
          setTimeout(() => {
            showPopup.value = props.isShow
          }, 500)
        }
      },
      { deep: true }
    )

    let moveHandle = function () {
      return false
    }

    return {
      showPopup,
      conetentFlag,
      closePopup,
      moveHandle
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
}
.mask {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.show_mask {
  background: rgba(0, 0, 0, 0.3);
}
.popup_content {
  height: 300px;
  width: 500px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 5px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 10;
  transform: translateY(3.75rem);
  opacity: 0;
}
.show_conent {
  transform: translateY(0);
  opacity: 1;
}
</style>
