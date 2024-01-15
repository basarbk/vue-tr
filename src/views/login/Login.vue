<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
    <form @submit.prevent="submit">
      <AppCard>
        <template v-slot:header>
          <h1>{{ $t('login') }}</h1>
        </template>
        <template v-slot:body>
          <AppInput
            id="e-mail"
            :label="$t('email')"
            :help="errors.email"
            v-model="formState.email"
          />
          <AppInput
            id="password"
            :label="$t('password')"
            :help="errors.password"
            v-model="formState.password"
            type="password"
          />
          <AppAlert v-if="errorMessage" variant="danger">{{ errorMessage }}</AppAlert>
          <div class="text-center">
            <AppButton :is-disabled="isDisabled" :apiProgress="apiProgress">
              {{ $t('login') }}
            </AppButton>
          </div>
        </template>
        <template v-slot:footer>
          <router-link to="/password-reset/request">{{ $t('passwordReset.forgot') }}</router-link>
        </template>
      </AppCard>
    </form>
  </div>
</template>
<script setup>
import AppInput from '@/components/AppInput.vue'
import AppAlert from '@/components/AppAlert.vue'
import AppButton from '@/components/AppButton.vue'
import AppCard from '@/components/AppCard.vue'
import { ref, computed, reactive, watch } from 'vue'
import login from './api'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { setLoggedIn } = useAuthStore()

const { t } = useI18n()
const router = useRouter()

const formState = reactive({ email: '', password: '' })
const apiProgress = ref(false)
const errorMessage = ref()
const errors = ref({})

const submit = async () => {
  apiProgress.value = true
  errorMessage.value = undefined
  try {
    const response = await login(formState)
    setLoggedIn(response.data)
    await router.push('/')
  } catch (apiError) {
    if (apiError.response?.status === 400) {
      errors.value = apiError.response.data.validationErrors
    } else if (apiError.response?.data?.message) {
      errorMessage.value = apiError.response.data.message
    } else {
      errorMessage.value = t('genericError')
    }
  } finally {
    apiProgress.value = false
  }
}
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
const isDisabled = computed(() => {
  return !(formState.password && formState.email)
})
</script>
