<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form class="card" @submit.prevent="submit" v-if="!successMessage">
      <div class="card-header">
        <h1 class="text-center">Sign Up</h1>
      </div>
      <div class="card-body">
        <AppInput
          id="username"
          label="Username"
          :help="errors.username"
          v-model="formState.username"
        />
        <AppInput id="email" label="E-mail" :help="errors.email" v-model="formState.email" />
        <AppInput
          id="password"
          label="Password"
          :help="errors.password"
          v-model="formState.password"
          type="password"
        />
        <AppInput
          id="passwordRepeat"
          label="Password Repeat"
          v-model="formState.passwordRepeat"
          type="password"
        />
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
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
    <div v-else class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>
  </div>
</template>
<script setup>
import AppInput from '@/components/AppInput.vue'
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
const formState = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  passwordRepeat: undefined
})

const errors = ref({})

const apiProgress = ref(false)
const successMessage = ref()
const errorMessage = ref()

const isDisabled = computed(() => {
  return formState.password || formState.passwordRepeat
    ? formState.password !== formState.passwordRepeat
    : true
})

const submit = async () => {
  apiProgress.value = true
  errorMessage.value = undefined
  // eslint-disable-next-line no-unused-vars
  const { passwordRepeat, ...body } = formState
  try {
    const response = await axios.post('/api/v1/users', body)
    successMessage.value = response.data.message
  } catch (apiError) {
    if (apiError.response.status === 400) {
      errors.value = apiError.response.data.validationErrors
    } else {
      errorMessage.value = 'Unexpected error occured, please try again'
    }
    apiProgress.value = false
  }
}
</script>
<!-- <script>
import axios from 'axios'
import AppInput from '@/components/AppInput.vue'

export default {
  components: {
    AppInput
  },
  data() {
    return {
      formState: {
        username: undefined,
        email: undefined,
        password: undefined,
        passwordRepeat: undefined
      },
      apiProgress: false,
      successMessage: undefined,
      errorMessage: undefined,
      errors: {}
    }
  },
  methods: {
    async submit() {
      this.apiProgress = true
      this.errorMessage = undefined
      // eslint-disable-next-line no-unused-vars
      const { passwordRepeat, ...body } = this.formState
      try {
        const response = await axios.post('/api/v1/users', body)
        this.successMessage = response.data.message
      } catch (apiError) {
        if (apiError.response.status === 400) {
          this.errors = apiError.response.data.validationErrors
        } else {
          this.errorMessage = 'Unexpected error occured, please try again'
        }
        this.apiProgress = false
      }
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
