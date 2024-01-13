<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Activation</h1>
</template>
<script setup>
import axios from 'axios'
import { onMounted } from 'vue'

onMounted(() => {
  axios.patch('/api/v1/users/token-from-url/active')
})
</script>
<!-- <script>
import axios from 'axios'

export default {
  mounted() {
    axios.patch('/api/v1/users/token-from-url/active')
  }
}
</script> -->
