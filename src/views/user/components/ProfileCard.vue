<template>
  <AppCard>
    <template v-slot:header>
      <img
        class="rounded-circle shadow"
        width="200"
        height="200"
        :alt="user.username + ' profile'"
        src="/assets/profile.png"
      />
    </template>
    <template v-slot:body>
      <div class="text-center">
        <h3>{{ user.username }}</h3>
        <UserDeleteButton :id="user.id" />
      </div>
    </template>
  </AppCard>
</template>
<script setup>
import AppCard from '@/components/AppCard.vue'
import UserDeleteButton from './UserDeleteButton.vue'
defineProps({
  user: Object
})
</script>
