<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Activation</h1>
</template>
<script setup>
import axios from 'axios'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

watchEffect(() => {
  axios.patch(`/api/v1/users/${route.params.token}/active`)
})
</script>
<!-- <script>
import axios from 'axios'

export default {
  mounted() {
    axios.patch(`/api/v1/users/${this.$route.params.token}/active`)
  },
  watch: {
    '$route.params.token'() {
      axios.patch(`/api/v1/users/${this.$route.params.token}/active`)
    }
  }
}
</script> -->
