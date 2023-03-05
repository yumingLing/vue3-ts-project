<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span> 账号登录</span>
          </span>
        </template>
        <loginAccount ref="accountRef"></loginAccount>
      </el-tab-pane>
      <el-tab-pane label="Config">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span> 手机登录</span>
          </span>
        </template>

        <loginPhone></loginPhone
      ></el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="logint-btn" @click="enterLogin"
      >立即登录</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTabs, ElTabPane, ElCheckbox, ElLink } from 'element-plus'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof loginAccount>>() // 不传就是any类型
    // const loginAction = () => {}
    const enterLogin = () => {
      console.log('dj')
      accountRef.value?.loginAction()
    }
    return { isKeepPassword, enterLogin, accountRef }
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  width: 320px;
}
.account-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.logint-btn {
  margin-top: 10px;
  width: 100%;
}
</style>
