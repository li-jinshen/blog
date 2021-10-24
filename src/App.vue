
<template>
  <router-view></router-view>
</template>


  <script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Article',
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const userToken = localStorage.getItem('userToken')
      ? JSON.parse(localStorage.getItem('userToken'))
      : ''
    onMounted(() => {
      getBloggerProfile()
      if (userToken) {
        const { LandingTime, token } = userToken
        let distance =
          (new Date().getTime() - new Date(LandingTime).getTime()) /
          1000 /
          60 /
          60 /
          24
        if (distance > 5 && distance < 7) {
          refreshToken(token) // 刷新token
        } else if (distance > 7) {
          localStorage.removeItem('userToken')
          store.commit('updateLoginStatus', false) // 更新登录状态
        } else {
          store.commit('updateLoginStatus', true) // 更新登录状态
        }
      } else {
        visitorsToRecord()
      }

      // console.log(returnCitySN)
      // console.log(
      //   'IP地址:' +
      //     returnCitySN['cip'] +
      //     ', CID:' +
      //     returnCitySN['cid'] +
      //     ', 地区:' +
      //     returnCitySN['cname']
      // )
    })

    // 刷新token
    const refreshToken = (token) => {
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.refreshToken,
          data: {
            token
          }
        })
        .then((res) => {
          console.log('刷新token', res)
          if (res.status == 1) {
            let userToken = {
              token: res.token
            }
            localStorage.setItem('userToken', JSON.stringify(userToken))
            getBloggerProfile()
            store.commit('updateLoginStatus', true) // 更新登录状态
            // ElMessage.success(res.msg)
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((error) => {
          console.log('登录错误', error)
        })
    }

    // 访客记录
    const visitorsToRecord = () => {
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.visitorsToRecord,
          data: {
            ip: returnCitySN['cip'],
            cname: returnCitySN['cname']
          }
        })
        .then((res) => {
          console.log('访客记录', res)
        })
        .catch((error) => {
          // console.log('登录错误', error)
        })
    }

    // 获取博主个人信息
    const getBloggerProfile = () => {
      proxy
        .$request({
          method: 'get',
          url: proxy.$requestPath.getBloggerProfile,
          params: { isAdmin: true }
        })
        .then((res) => {
          console.log('获取博主个人信息', res)
          store.commit('updateBloggerProfile', res)
        })
        .catch(() => {
          // console.log('登录错误', error)
        })
    }

    return
  }
})
</script>
    

<style lang="scss">
@import url('https://at.alicdn.com/t/font_2715113_go4yhgil3o.css');
input {
  background: none;
  outline: none;
  border: none;
}

html,
body {
  height: 100vh;
  width: 100vw;
}
body {
  /* min-width: 800px; */
  min-height: 600px;
  background-image: url('https://pic.rmb.bdstatic.com/bjh/f30968641a6433f315533c027f345baa.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
