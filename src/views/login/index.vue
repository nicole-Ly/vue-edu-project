<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">登录</div>
      <el-form :model="formInfo" :rules="rules" ref="form"  label-position="top"  label-width="100px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInfo.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm" :loading="isLoginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/service/user'
import { mapMutations } from 'vuex'
export default Vue.extend({
  name: 'loginPage',
  data () {
    return {
      isLoginLoading: false,
      formInfo: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async submitForm () {
      try {
        await (this.$refs.form as Form).validate()
        if (this.isLoginLoading) return
        this.isLoginLoading = true
        const user = await login(this.formInfo)
        this.isLoginLoading = false
        console.log(user.data.state)
        const { state, message, content } = user.data
        if (user.data.state !== 1) {
          this.$message.error(message)
          return
        }
        this.setUser(content)
        console.log(user.data.content)
        this.$router.push('/')
      } catch (error) {
        console.log('登录失败', error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  justify-content: center;
  .title{
    padding: 20px;
    font-weight: 600;
    font-size: 22px;
    text-align: center;
  }
  .login-card{
    margin-top:200px;
    width:28%;
   .login-btn{
     width:100%;
    }
  }
}
</style>
