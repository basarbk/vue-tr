<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form class="card" @submit.prevent="submit">
      <div class="card-header">
        <h1 class="text-center">Sign Up</h1>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input class="form-control" id="username" v-model="formState.username" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input class="form-control" id="email" v-model="formState.email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input class="form-control" id="password" type="password" v-model="formState.password" />
        </div>
        <div class="mb-3">
          <label for="passwordRepeat" class="form-label">Password Repeat</label>
          <input
            class="form-control"
            id="passwordRepeat"
            type="password"
            v-model="formState.passwordRepeat"
          />
        </div>
        <div class="text-center">
          <button :disabled="isDisabled || apiProgress" class="btn btn-primary">
            <span
              v-if="apiProgress"
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
const formState = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  passwordRepeat: undefined
})

const apiProgress = ref(false)

const isDisabled = computed(() => {
  return formState.password || formState.passwordRepeat
    ? formState.password !== formState.passwordRepeat
    : true
})

const submit = () => {
  apiProgress.value = true
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
      },
      apiProgress: false
    }
  },
  methods: {
    submit() {
      this.apiProgress = true
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
