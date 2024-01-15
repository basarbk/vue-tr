<template>
  <AppButton
    v-if="auth.id === id"
    variant="danger"
    @click="onClickDelete"
    :api-progress="apiProgress"
    >{{ t('deleteUser.button') }}</AppButton
  >
  <AppAlert variant="danger" v-if="error">{{ error }}</AppAlert>
</template>
<script setup>
import AppAlert from '@/components/AppAlert.vue'
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteUser } from './api'

defineProps({
  id: Number
})
const { t } = useI18n()
const router = useRouter()
const { auth, logout } = useAuthStore()
const apiProgress = ref(false)
const error = ref()
const onClickDelete = async () => {
  error.value = undefined
  const response = confirm(t('deleteUser.confirm'))
  if (response) {
    try {
      apiProgress.value = true
      await deleteUser(auth.id)
      logout()
      router.push('/')
    } catch {
      error.value = t('genericError')
      apiProgress.value = false
    }
  }
}
</script>
