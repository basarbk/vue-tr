<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="card">
    <div class="card-header text-center">
      <h2>{{ $t('userList.header') }}</h2>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action" v-for="user in pageData.content">
        {{ user.username }}
      </li>
    </ul>
    <div class="card-footer text-center">
      <AppSpinner v-if="apiProgress" />
      <button
        v-if="pageData.page !== 0"
        class="btn btn-outline-secondary btn-sm float-start"
        @click="loadData(pageData.page - 1)"
      >
        {{ $t('userList.previous') }}
      </button>
      <button
        v-if="pageData.totalPages > pageData.page + 1"
        class="btn btn-outline-secondary btn-sm float-end"
        @click="loadData(pageData.page + 1)"
      >
        {{ $t('userList.next') }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import loadUsers from './api'
import AppSpinner from '@/components/AppSpinner.vue'

const apiProgress = ref()

const pageData = reactive({
  content: [],
  page: 0,
  size: 0,
  totalPages: 0
})

onMounted(async () => {
  loadData()
})

const loadData = async (pageIndex) => {
  apiProgress.value = true
  try {
    const response = await loadUsers(pageIndex)
    pageData.content = response.data.content
    pageData.page = response.data.page
    pageData.size = response.data.size
    pageData.totalPages = response.data.totalPages
    // eslint-disable-next-line no-empty
  } catch {}
  apiProgress.value = false
}
</script>
