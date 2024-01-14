<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <AppAlert variant="danger" v-if="status === 'fail'">{{ error }}</AppAlert>
    <AppAlert variant="secondary" center v-if="status === 'loading'">
      <AppSpinner size="normal" />
    </AppAlert>
    <ProfileCard v-if="status === 'success'" :user="data" />
  </div>
</template>
<script setup>
import ProfileCard from './components/ProfileCard.vue'
import getUserById from './api'
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'

import useRouteParamApiRequest from '@/shared/useRouteParamApiRequest'

const { status, data, error } = useRouteParamApiRequest(getUserById, 'id')
</script>
