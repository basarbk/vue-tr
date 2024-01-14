<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="card">
    <div class="card-header text-center">
      <h2>Users</h2>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action" v-for="user in pageData.content">
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import loadUsers from './api'

const pageData = reactive({
  content: [],
  page: 0,
  size: 0,
  totalPages: 0
})

onMounted(async () => {
  const response = await loadUsers()
  pageData.content = response.data.content
  pageData.page = response.data.page
  pageData.size = response.data.size
  pageData.totalPages = response.data.totalPages
})
</script>
