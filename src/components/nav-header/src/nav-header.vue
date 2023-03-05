<template>
  <div class="nav-header">
    <!-- <el-icon><Expand /></el-icon> -->
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Fold v-if="!isFold" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <user-info></user-info>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'

export default defineComponent({
  name: 'nav-hearder',
  components: {
    UserInfo
  },
  setup(props, { emit }) {
    const isFold = ref(true)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
