<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
    <form class="card" @submit.prevent="submit">
      <div class="card-header text-center">
        <h1>{{ $t('passwordReset.set') }}</h1>
      </div>
      <div class="card-body">
        <AppInput
          id="password"
          :label="$t('password')"
          :help="errors.password"
          v-model="password"
          type="password"
        />
        <AppInput
          id="passwordRepeat"
          :label="$t('passwordRepeat')"
          :help="passwordMatchError"
          v-model="passwordRepeat"
          type="password"
        />
        <AppAlert v-if="errorMessage" variant="danger">{{ errorMessage }}</AppAlert>
        <AppAlert v-if="successMessage">{{ successMessage }}</AppAlert>
        <div class="text-center">
          <button class="btn btn-primary" :disabled="isDisabled || apiProgress">
            <AppSpinner v-if="apiProgress" />
            {{ $t('passwordReset.set') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import AppInput from '@/components/AppInput.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'
import { computed, ref, watch } from 'vue'
import { passwordSet } from './api'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const { t } = useI18n()
const route = useRoute()
const password = ref('')
const passwordRepeat = ref('')
const apiProgress = ref(false)
const successMessage = ref()
const errorMessage = ref()
const errors = ref({})
const submit = async () => {
  apiProgress.value = true
  errorMessage.value = undefined
  successMessage.value = undefined
  try {
    const response = await passwordSet(route.query.tk, { password: password.value })
    successMessage.value = response.data.message
  } catch (apiError) {
    if (apiError.response?.data?.validationErrors) {
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
  () => password.value,
  () => {
    delete errors.value.password
  }
)
const isDisabled = computed(() => {
  return password.value || passwordRepeat.value ? password.value !== passwordRepeat.value : true
})
const passwordMatchError = computed(() => {
  return password.value !== passwordRepeat.value ? t('passwordMismatch') : ''
})
</script>