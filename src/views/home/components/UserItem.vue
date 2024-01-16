<template>
  <li class="list-group-item list-group-item-action" @click="$router.push('/user/' + user.id)">
    <ProfileImage width="30" class="rounded-circle shadow-sm" :image="user.image" />
    {{ user.username }}
  </li>
</template>
<script setup>
import ProfileImage from '@/components/ProfileImage.vue'
defineProps({
  user: Object
})
</script>
<style scoped>
li {
  cursor: pointer;
}
</style>
