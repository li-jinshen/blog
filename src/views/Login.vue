<template>
  <div class="login">
    <TabsList></TabsList>
    <div class="box flex items-center rounded">
      <div style="width:400px;height:500px" class="flex items-center justify-center">
        <img src="../assets/images/backend.jpg" style="width:100%;height:auto" alt />
      </div>
      <div style="width:400px" class="login">
        <h2 class="text-xl font-bold">Login</h2>
        <form>
          <div class="inputBox">
            <input type="text" name required v-model="account" />
            <label>Username</label>
          </div>
          <div class="inputBox">
            <input type="password" name required v-model="password" />
            <label>password</label>
          </div>
          <!-- <input type="submit" name value="Submit" /> -->
          <div class="btn text-white py-2 bg-primary rounded cursor-pointer" @click="login">Submit</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import TabsList from './home/components/TabList.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'App',
  components: {
    TabsList
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const store = useStore()
    let state = reactive({
      account: '',
      password: ''
    })
    const login = () => {
      if (proxy.$isNull(state.account)) {
        ElMessage.error('用户名不能为空')
        return
      }
      if (proxy.$isNull(state.password)) {
        ElMessage.error('登录密码不能为为空')
        return
      }
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.login,
          data: {
            account: state.account,
            passWord: state.password
          }
        })
        .then((res) => {
          console.log('登录', res)
          if (res.status == 1) {
            ElMessage.success(res.msg)
            let userToken = {
              token: res.token,
              ...res.user
            }
            localStorage.setItem('userToken', JSON.stringify(userToken))
            store.commit('updateLoginStatus', true) // 更新登录状态
            setTimeout(() => {
              reset()
              router.push({ path: '/blog/admin' })
            }, 1000)
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((error) => {
          console.log('登录错误', error)
        })
    }
    const reset = () => {
      state.account = ''
      state.password = ''
    }
    return {
      ...toRefs(state),
      login
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.3);
  //   background: transparent;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.login {
  padding: 40px;
}
.box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.box .inputBox {
  position: relative;
}
.box .inputBox input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.box .inputBox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  letter-spacing: 1px;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.box .inputBox input:focus ~ label,
.box .inputBox input:valid ~ label {
  top: -18px;
  left: 0;
  color: var(--primary);
  font-size: 12px;
}
// .box input[type='submit'] {
//   background: transparent;

//   border: none;
//   outline: none;
//   color: #fff;
//   background: #03a9f4;
//   padding: 10px 20px;
//   cursor: pointer;
//   border-radius: 5px;
// }
</style>
