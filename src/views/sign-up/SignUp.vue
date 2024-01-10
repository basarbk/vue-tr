<template>
  <form @submit.prevent="submit">
    <h1>Sign Up</h1>
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="formState.username" />
    </div>
    <div>
      <label for="email">E-mail</label>
      <input id="email" v-model="formState.email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="formState.password" />
    </div>
    <div>
      <label for="passwordRepeat">Password Repeat</label>
      <input id="passwordRepeat" type="password" v-model="formState.passwordRepeat" />
    </div>
    <button :disabled="isDisabled">Sign Up</button>
  </form>
</template>
<script setup>
import axios from 'axios'
import { computed, reactive } from 'vue'
const formState = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  passwordRepeat: undefined
})

const isDisabled = computed(() => {
  return formState.password || formState.passwordRepeat
    ? formState.password !== formState.passwordRepeat
    : true
})

const submit = () => {
  // eslint-disable-next-line no-unused-vars
  const { passwordRepeat, ...body } = formState
  axios.post('/api/v1/users', body)
}
</script>
<!-- <script>
import axios from 'axios'

export default {
  data() {
    return {
      formState: {
        username: undefined,
        email: undefined,
        password: undefined,
        passwordRepeat: undefined
      }
    }
  },
  methods: {
    submit() {
      // eslint-disable-next-line no-unused-vars
      const { passwordRepeat, ...body } = this.formState.axios.post('/api/v1/users', body)
    }
  },
  computed: {
    isDisabled() {
      return this.formState.password || this.formState.passwordRepeat
        ? this.formState.password !== this.formState.passwordRepeat
        : true
    }
  }
}
</script> -->
