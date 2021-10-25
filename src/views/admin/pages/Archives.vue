<template>
  <div class="p-4">
    <div class="flex py-2 item">
      <div class="text-gray-500 left">用户名:</div>
      <div class="right">{{ getBloggerProfile.userName }}</div>
    </div>
    <div class="flex py-2 item">
      <div class="text-gray-500 left">用户账号:</div>
      <div class="right">{{ getBloggerProfile.account }}</div>
    </div>
    <div class="flex py-2 item">
      <div class="text-gray-500 left">用户头像:</div>
      <div class="right">
        <div style="width:100px;height: 100px;">
          <!-- <img
            :src="getBloggerProfile.photo"
            alt
            style="width: 100%;height: 100%;object-fit: cover;"
          />-->
          <ImageItem :url="getBloggerProfile.photo" :width="100" :height="100" :scale="true"></ImageItem>
        </div>
      </div>
    </div>
    <div class="flex py-2 item">
      <div class="text-gray-500 left">用户签名:</div>
      <div class="right">{{ getBloggerProfile.signature }}</div>
    </div>
    <div class="flex py-2 item">
      <div class="text-gray-500 left">注册时间:</div>
      <div class="right">{{ transfromDate(getBloggerProfile.date, 'simple') }}</div>
    </div>
    <div class="flex py-2 item">
      <div class="text-gray-500 left">最近登录时间:</div>
      <div class="right">{{ transfromDate(getBloggerProfile.LandingTime, 'simple') }}</div>
    </div>
    <div class="flex justify-start pt-4">
      <el-button type="primary" @click="modifyProfile('file')">修改用户信息</el-button>
      <el-button type="primary" @click="modifyProfile('pwd')">修改账号密码</el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" :title="type == 'file' ? '修改用户信息' : '修改密码'" width="500px">
      <el-form v-if="type == 'file'">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userName" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input v-model="photo" autocomplete="off" placeholder="请输入头像地址"></el-input>
        </el-form-item>
        <el-form-item label="签名" :label-width="formLabelWidth">
          <el-input v-model="signature" autocomplete="off" type="textarea" placeholder="请输入签名"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="judgePassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="modifyRequest" v-if="type == 'file'">确定</el-button>
          <el-button type="primary" @click="modifyPassword" v-else>确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { onMounted, getCurrentInstance, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getBloggerProfile'])
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()

    const transfromDate = proxy.$transformDate

    let state = reactive({
      userName: '',
      photo: '',
      password: '',
      judgePassword: '',
      signature: '',
      dialogFormVisible: false,
      formLabelWidth: 100,
      type: 'file'
    })

    onMounted(() => { })

    const modifyProfile = (type) => {
      state.type = type
      state.userName = store.getters.getBloggerProfile.userName
      state.photo = store.getters.getBloggerProfile.photo
      state.password = ''
      state.signature = store.getters.getBloggerProfile.signature
      state.judgePassword = ''
      state.dialogFormVisible = true
    }

    const modifyRequest = () => {
      if (proxy.$isNull(state.userName)) {
        ElMessage.success('用户名不能为空')
        return
      }
      if (proxy.$isNull(state.photo)) {
        ElMessage.success('用户头像不能为空')
        return
      }
      let data = {
        userName: state.userName,
        photo: state.photo,
        signature: state.signature,
        _id: store.getters.getBloggerProfile._id
      }
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.modifyProfile,
          data
        })
        .then((res) => {
          if (res.status == 1) {
            ElMessage.success(res.msg)
            state.dialogFormVisible = false
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((error) => {
          console.log('更新用户信息', error)
        })
    }
    const modifyPassword = () => {
      if (proxy.$isNull(state.password)) {
        ElMessage.error('密码不能为空')
        return
      }
      if (
        !proxy.$isNull(state.password) &&
        state.password !== state.judgePassword
      ) {
        ElMessage.error('两次密码不一致')
        return
      }
      proxy
        .$request({
          method: 'post',
          url: proxy.$requestPath.modifyPassword,
          data: {
            _id: store.getters.getBloggerProfile._id,
            password: state.password
          }
        })
        .then((res) => {
          if (res.status == 1) {
            ElMessage.success(res.msg + ',请重新的登录')
            state.dialogFormVisible = false
            store.commit('updateLoginStatus', false) // 更新登录状态
            setTimeout(() => {
              router.push({ path: '/' })
            }, 1000)
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((error) => {
          console.log('更新用户信息', error)
        })
    }

    return {
      transfromDate,
      ...toRefs(state),
      modifyProfile,
      modifyRequest,
      modifyPassword
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 14px;
}
.left {
  width: 100px;
  text-align: left;
}
</style>
