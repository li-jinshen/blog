<template>
  <div class>
    <div class="flex">
      <div class="left">头像</div>
      <div>
        <div style="width:100px;height: 100px;">
          <img
            :src="getBloggerProfile.phont"
            alt
            style="width: 100%;height: 100%;object-fit: cover;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { onMounted } from "vue"
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getBloggerProfile'])
  },
  setup() {


    onMounted(() => {

    })


    return
  }
}
</script>

<style lang="scss" scoped>
</style>
