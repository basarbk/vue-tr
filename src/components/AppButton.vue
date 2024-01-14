<template>
  <button :disabled="isDisabled || apiProgress" :class="`btn btn-${variant}`">
    <AppSpinner v-if="apiProgress" />
    <slot></slot>
  </button>
</template>
<script setup>
import AppSpinner from './AppSpinner.vue'
defineProps({
  isDisabled: Boolean,
  apiProgress: Boolean,
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>
