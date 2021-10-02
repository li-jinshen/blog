<template>
  <div class="container h-full w-full px-2" id="cotainer">
    <div class="w-full">
      <div class="fade-in full-width bg-primary" />
      <div class="fade-in full-width bg-primary" />
      <div class="half-width fade-in bg-primary" />
      <div class="half-width fade-in bg-primary" />
    </div>
  </div>
</template>
    
<script>
import { onMounted, onBeforeUnmount } from 'vue'
import mitt from '../../../common/EventBus'
export default {
  name: 'Article',
  setup() {
    var fadeInElements = []

    onMounted(() => {
      fadeInElements = Array.from(document.getElementsByClassName('fade-in'))
      // document
      //   .getElementById('cotainer')
      //   .addEventListener('scroll', handleScroll)
      handleScroll()
    })
    mitt.on('onScroll', () => {
      handleScroll()
    })

    onBeforeUnmount(() => {
      document
        .getElementById('cotainer')
        .removeEventListener('scroll', handleScroll)
    })

    const handleScroll = (evt) => {
      console.log('我执行了')
      for (var i = 0; i < fadeInElements.length; i++) {
        var elem = fadeInElements[i]
        if (isElemVisible(elem)) {
          elem.style.opacity = '1'
          elem.style.transform = 'scale(1)'
          fadeInElements.splice(i, 1) // 只让它运行一次
        }
      }
    }
    const isElemVisible = (el) => {
      var rect = el.getBoundingClientRect()
      var elemTop = rect.top + 200 // 200 = buffer
      var elemBottom = rect.bottom
      return elemTop < window.innerHeight && elemBottom >= 0
    }

    return {}
  }
}
</script>
    
<style lang="scss" scoped>
.container {
  width: 100%;
  // min-width: 450px;
  margin: 0 auto;
}

.fade-in {
  height: 500px;
  margin-bottom: 50px;
  opacity: 0;
  transition: 0.3s all ease-out;
  transform: scale(0.8);
  box-sizing: border-box;
  padding: 20px;
  display: inline-block;
}
.full-width {
  width: 100%;
}

.half-width {
  width: 47.5%;
}

.half-width:nth-of-type(2n + 1) {
  margin-right: 2.5%;
}

.half-width:nth-of-type(2n) {
  margin-left: 2.5%;
}
</style>
    