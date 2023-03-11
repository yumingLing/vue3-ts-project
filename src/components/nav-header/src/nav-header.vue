<template>
  <div class="nav-header">
    <!-- <el-icon><Expand /></el-icon> -->
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Fold v-if="!isFold" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <div><NavBreadcrumb :breadcrumbs="breadcrumbs"></NavBreadcrumb></div>
      <user-info></user-info>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import NavBreadcrumb from '@/base-ui/breadcrumb/src/breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  name: 'nav-hearder',
  components: {
    UserInfo,
    NavBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(true)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据 [{name:'',path:''}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenu = store.state.login.userMenu
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenu, currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
