<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input type="text" v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          type="password"
          v-model="phone.code"
          class="code-input"
        ></el-input>
        <el-button type="primary">验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    return {
      phone,
      rules
    }
  }
})
</script>
<style lang="less" scoped>
.code-input {
  width: 65%;
  padding-right: 3%;
}
</style>
