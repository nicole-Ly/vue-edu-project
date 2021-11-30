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
export default Vue.extend({
  data () {
    return {
      isLoginLoading: true,
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
    async submitForm () {
      await (this.$refs.form as Form).validate()
      if (this.isLoginLoading) return
      this.isLoginLoading = true
      console.log(1111111111111)
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
