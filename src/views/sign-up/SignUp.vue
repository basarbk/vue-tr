<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form class="card" @submit.prevent="submit" v-if="!successMessage">
      <div class="card-header">
        <h1 class="text-center">{{ $t('signUp') }}</h1>
      </div>
      <div class="card-body">
        <AppInput
          id="username"
          :label="$t('username')"
          :help="errors.username"
          v-model="formState.username"
        />
        <AppInput id="email" :label="$t('email')" :help="errors.email" v-model="formState.email" />
        <AppInput
          id="password"
          :label="$t('password')"
          :help="errors.password"
          v-model="formState.password"
          type="password"
        />
        <AppInput
          id="passwordRepeat"
          :label="$t('passwordRepeat')"
          v-model="formState.passwordRepeat"
          type="password"
          :help="passwordMatchError"
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
            {{ $t('signUp') }}
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
import signUp from './api'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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

const passwordMatchError = computed(() => {
  return formState.password !== formState.passwordRepeat ? t('passwordMismatch') : ''
})

watch(
  () => formState.username,
  () => {
    delete errors.value.username
  }
)

watch(
  () => formState.email,
  () => {
    delete errors.value.email
  }
)

watch(
  () => formState.password,
  () => {
    delete errors.value.password
  }
)

const submit = async () => {
  apiProgress.value = true
  errorMessage.value = undefined
  // eslint-disable-next-line no-unused-vars
  const { passwordRepeat, ...body } = formState
  try {
    const response = await signUp(body)
    successMessage.value = response.data.message
  } catch (apiError) {
    if (apiError.response?.status === 400) {
      errors.value = apiError.response.data.validationErrors
    } else {
      errorMessage.value = t('genericError')
    }
    apiProgress.value = false
  }
}
</script>
<!-- <script>
import AppInput from '@/components/AppInput.vue'
import signUp from './api'

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
        const response = await signUp(body)
        this.successMessage = response.data.message
      } catch (apiError) {
        if (apiError.response?.status === 400) {
          this.errors = apiError.response.data.validationErrors
        } else {
          this.errorMessage = this.$t('genericError')
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
  },
  watch: {
    'formState.username'() {
      delete this.errors.username
    },
    'formState.email'() {
      delete this.errors.email
    },
    'formState.password'() {
      delete this.errors.password
    }
  }
}
</script> -->
