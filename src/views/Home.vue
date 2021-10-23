<template>
  <div class="flex items-center justify-center w-full h-full home">
    <TabsList></TabsList>
    <div class="flex items-center box">
      <transition name="left">
        <div class="h-full left" v-if="show">
          <div class="rounded info">
            <info></info>
          </div>
          <div class="rounded menu">
            <Menu></Menu>
          </div>
        </div>
      </transition>
      <transition name="tablist">
        <div class="rounded right" v-if="show">
          <Content></Content>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Info from './home/components/Info.vue'
import Content from './home/components/Content.vue'
import Menu from './home/components/Menu.vue'
import TabsList from './home/components/TabList.vue'
export default defineComponent({
  name: 'home',
  setup() {
    let state = reactive({
      show: false
    })
    onMounted(() => {
      state.show = true
    })
    return {
      ...toRefs(state)
    }
  },
  components: {
    Info,
    Content,
    Menu,
    TabsList
  }
})
</script>
<style lang="scss" scoped>
.home {
  overflow-y: hidden;
  .box {
    min-height: 600px;
    max-height: 650px;
    height: 90%;
    width: 80%;
    min-width: 990px;
    max-width: 1100px;
    .left {
      height: 100%;
      width: 200px;
      z-index: 100;
      & > div {
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(13.5px);
        -webkit-backdrop-filter: blur(16.5px);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }
      .info {
        height: 180px;
      }
      .menu {
        height: calc(100% - 190px);
        margin-top: 10px;
      }
    }
    .right {
      // display: flex;
      // flex: auto;
      margin-left: 10px;
      height: 100%;
      width: calc(100% - 190px);
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(13.5px);
      -webkit-backdrop-filter: blur(13.5px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
  }
}
</style>