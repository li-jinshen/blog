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
          <img
            :src="getBloggerProfile.photo"
            alt
            style="width: 100%;height: 100%;object-fit: cover;"
          />
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
      <el-button type="primary" @click="modifyProfile">修改用户信息</el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="修改用户信息" width="500px">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userName" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input v-model="photo" autocomplete="off" placeholder="请输入头像地址"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="judgePassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="签名" :label-width="formLabelWidth">
          <el-input v-model="signature" autocomplete="off" type="textarea" placeholder="请输入签名"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="modifyRequest">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { onMounted, getCurrentInstance, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['getBloggerProfile'])
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()

    const transfromDate = proxy.$transformDate

    let state = reactive({
      userName: '',
      photo: '',
      password: '',
      judgePassword: '',
      signature: '',
      dialogFormVisible: false,
      formLabelWidth: 100
    })

    onMounted(() => {})

    const modifyProfile = () => {
      state.userName = store.getters.getBloggerProfile.userName
      state.photo = store.getters.getBloggerProfile.photo
      state.password = ''
      state.signature = store.getters.getBloggerProfile.signature
      state.judgePassword = ''
      state.dialogFormVisible = true
    }

    const modifyRequest = () => {}

    return {
      transfromDate,
      ...toRefs(state),
      modifyProfile,
      modifyRequest
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
