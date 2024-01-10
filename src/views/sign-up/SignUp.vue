<template>
  <h1>Sign Up</h1>
  <div>
    <label for="username">Username</label>
    <input id="username" />
  </div>
  <div>
    <label for="email">E-mail</label>
    <input id="email" />
  </div>
  <div>
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
  </div>
  <div>
    <label for="passwordRepeat">Password Repeat</label>
    <input id="passwordRepeat" type="password" v-model="passwordRepeat" />
  </div>
  <button :disabled="isDisabled">Sign Up</button>
</template>
<script setup>
import { computed, ref } from 'vue'

const password = ref()
const passwordRepeat = ref()

const isDisabled = computed(() => {
  return password.value || passwordRepeat.value ? password.value !== passwordRepeat.value : true
})
</script>
<!-- <script>
export default {
  data() {
    return {
      password: undefined,
      passwordRepeat: undefined
    }
  },
  computed: {
    isDisabled() {
      return this.password || this.passwordRepeat ? this.password !== this.passwordRepeat : true
    }
  }
}
</script> -->
