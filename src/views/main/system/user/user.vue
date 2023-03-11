<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
  </div>
  <page-content
    :contentTableConfig="contentTableConfig"
    pageName="users"
    ref="pageContentRef"
  ></page-content>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import pageSearch from '@/components/page-search/src/page-search.vue'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user-page',
  components: {
    pageSearch,
    PageContent
  },

  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef
    }
  }
})
</script>

<style scoped></style>
