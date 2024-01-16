<template>
  <img :src="path" @error="($event) => ($event.target.src = '/assets/profile.png')" />
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  tempImage: String,
  image: String
})

const path = computed(() => {
  if (props.tempImage) return props.tempImage
  if (props.image) return '/images/' + props.image
  return '/assets/profile.png'
})
</script>
