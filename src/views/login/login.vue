<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  name: 'Login-comp',
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/img/login-bg.svg');
}
</style>
