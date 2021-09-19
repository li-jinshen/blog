<template>
  <div class="popup">
    <div class="mask"></div>
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
.mask {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
</style>
