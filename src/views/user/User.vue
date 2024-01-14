<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <AppAlert variant="danger" v-if="status === 'fail'">{{ errorMessage }}</AppAlert>
    <AppAlert variant="secondary" center v-if="status === 'loading'">
      <AppSpinner size="normal" />
    </AppAlert>
    <ProfileCard v-if="status === 'success'" :user="user" />
  </div>
</template>
<script setup>
import ProfileCard from './components/ProfileCard.vue'
import { useRoute } from 'vue-router'
import getUserById from './api'
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'

const { t } = useI18n()
const route = useRoute()
const errorMessage = ref('')
const status = ref()
const user = ref()
watchEffect(async () => {
  status.value = 'loading'
  try {
    const response = await getUserById(route.params.id)
    user.value = response.data
    status.value = 'success'
  } catch (apiError) {
    status.value = 'fail'
    if (apiError.response?.data?.message) {
      errorMessage.value = apiError.response.data.message
    } else {
      errorMessage.value = t('genericError')
    }
  }
})
</script>
